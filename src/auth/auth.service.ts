import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Injectable, UnauthorizedException, NotFoundException, BadRequestException, ConflictException, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { User } from '../user/interfaces/user.interface';
import { RefreshToken } from './interfaces/refresh-token.interface';
import { v4 } from 'uuid';
import { Request } from 'express';
import * as Cryptr from 'cryptr';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPassword } from '../user/interfaces/forgot-password.interface';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { VerifyUuidDto } from './dto/verify-uuid.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { addHours } from 'date-fns';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import {getClientIp} from 'request-ip';

@Injectable()
export class AuthService {

  cryptr: any;

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('RefreshToken') private readonly refreshTokenModel: Model<RefreshToken>,
    @InjectModel('ForgotPassword') private readonly forgotPasswordModel: Model<ForgotPassword>,
    private readonly jwtService: JwtService,
  ) {
    this.cryptr = new Cryptr('adesha');
  }
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const forgotPassword = await this.findForgotPasswordByEmail(resetPasswordDto);
    await this.setForgotPasswordFinalUsed(forgotPassword);
    await this.resetUserPassword(resetPasswordDto);
    return {
        email: resetPasswordDto.email,
        message: 'password successfully chenaged.',
    };
}
async refreshAccessToken(refreshAccessTokenDto: RefreshAccessTokenDto) {
  const userId = await this.findRefreshToken(refreshAccessTokenDto.refreshToken);
  const user = await this.userModel.findById(userId);
  if (!user) {
      throw new BadRequestException('Bad request');
  }
  return {
      accessToken: await this.createAccessToken(user._id),
  };
}

async forgotPassword(req: Request, createForgotPasswordDto: CreateForgotPasswordDto) {
  await this.findByEmail(createForgotPasswordDto.email);
  await this.saveForgotPassword(req, createForgotPasswordDto);
  return {
      email: createForgotPasswordDto.email,
      message: 'verification sent.',
  };
}

private async findByEmail(email: string): Promise<User> {
  const user = await this.userModel.findOne({ email, verified: true });
  if (!user) {
      throw new NotFoundException('Email not found.');
  }
  return user;
}
private async saveForgotPassword(req: Request, createForgotPasswordDto: CreateForgotPasswordDto) {
  const forgotPassword = await this.forgotPasswordModel.create({
      email: createForgotPasswordDto.email,
      verification: v4(),
      expires: addHours(new Date(), +process.env.REGISTRATION_HOURS_TO_VERIFY),
      ip: this.getIp(req),
      browser: this.getBrowserInfo(req),
      country: this.getCountry(req),
  });
  await forgotPassword.save();
}

private async findForgotPasswordByUuid(verifyUuidDto: VerifyUuidDto): Promise<ForgotPassword> {
  const forgotPassword = await this.forgotPasswordModel.findOne({
      verification: verifyUuidDto.verification,
      firstUsed: false,
      finalUsed: false,
      expires: { $gt: new Date() },
  });
  if (!forgotPassword) {
      throw new BadRequestException('Bad request.');
  }
  return forgotPassword;
}
async forgotPasswordVerify(req: Request, verifyUuidDto: VerifyUuidDto) {
  const forgotPassword = await this.findForgotPasswordByUuid(verifyUuidDto);
  await this.setForgotPasswordFirstUsed(req, forgotPassword);
  return {
      email: forgotPassword.email,
      message: 'now reset your password.',
  };
}
private async blockUser(user) {
  user.blockExpires = addHours(new Date(), +process.env.HOURS_TO_BLOCK);
  await user.save();
}

private async passwordsAreMatch(user) {
  user.loginAttempts = 0;
  await user.save();
}
async create(createUserDto: CreateUserDto): Promise<User> {
  const user = new this.userModel(createUserDto);
  await this.isEmailUnique(user.email);
  this.setRegistrationInfo(user);
  await user.save();
  return this.buildRegistrationInfo(user);
}

private async isEmailUnique(email: string) {
  const user = await this.userModel.findOne({ email, verified: true });
  if (user) {
      throw new BadRequestException('Email most be unique.');
  }
}

private buildRegistrationInfo(user): any {
  const userRegistrationInfo = {
      fullName: user.fullName,
      email: user.email,
      verified: user.verified,
  };
  return userRegistrationInfo;
}
private setRegistrationInfo(user): any {
  user.verification = v4();
  user.verificationExpires = addHours(new Date(), +process.env.REGISTRATION_HOURS_TO_VERIFY);
}
async login(req: Request, loginUserDto: LoginUserDto) {
  const user = await this.findUserByEmail(loginUserDto.email);
  this.isUserBlocked(user);
  await this.checkPassword(loginUserDto.password, user);
  await this.passwordsAreMatch(user);
  return {
      fullName: user.fullName,
      email: user.email,
      accessToken: await this.createAccessToken(user._id),
      refreshToken: await this.createRefreshToken(req, user._id),
      role: user.roles,
  };
}
private isUserBlocked(user) {
  if (user.blockExpires > Date.now()) {
      throw new ConflictException('User has been blocked try later.');
  }
}

private async passwordsDoNotMatch(user) {
  user.loginAttempts += 1;
  await user.save();
  if (user.loginAttempts >= +process.env.LOGIN_ATTEMPTS_TO_BLOCK) {
      await this.blockUser(user);
      throw new ConflictException('User blocked.');
  }
}

public async findUserByEmail(email: string): Promise<User> {
  const user = await this.userModel.findOne({ email, verified: true });
  if (!user) {
    const userNotVerified = await this.userModel.findOne({ email, verified: false });
    if (userNotVerified) {
      throw new NotFoundException('Please verify your account.');

    } else {
      throw new NotFoundException('Wrong email or password.');

    }
  }
  return user;
}

private async checkPassword(attemptPass: string, user) {
  const match = await bcrypt.compare(attemptPass, user.password);
  if (!match) {
      await this.passwordsDoNotMatch(user);
      throw new NotFoundException('Wrong email or password.');
  }
  return match;
}

private async setForgotPasswordFirstUsed(req: Request, forgotPassword: ForgotPassword) {
  forgotPassword.firstUsed = true;
  forgotPassword.ipChanged = this.getIp(req);
  forgotPassword.browserChanged = this.getBrowserInfo(req);
  forgotPassword.countryChanged = this.getCountry(req);
  await forgotPassword.save();
}

async verifyEmail(req: Request, verifyUuidDto: string) {
  const user = await this.findByVerification(verifyUuidDto);
  await this.setUserAsVerified(user);
  return {
      fullName: user.fullName,
      email: user.email,
      accessToken: await this.createAccessToken(user._id),
      refreshToken: await this.createRefreshToken(req, user._id),
  };
}
private async findByVerification(verification: string): Promise<User> {
  const user = await this.userModel.findOne({ verification, verified: false, verificationExpires: { $gt: new Date() } });
  if (!user) {
      throw new BadRequestException('Bad request.');
  }
  return user;
}

private async setUserAsVerified(user) {
  user.verified = true;
  await user.save();
}

  async createAccessToken(userId: string) {
    // const accessToken = this.jwtService.sign({userId});
    const accessToken = sign({userId}, process.env.JWT_SECRET , { expiresIn: process.env.JWT_EXPIRATION });
    return this.encryptText(accessToken);
  }

  async createRefreshToken(req: Request, userId) {
    const refreshToken = new this.refreshTokenModel({
      userId,
      refreshToken: v4(),
      ip: this.getIp(req),
      browser: this.getBrowserInfo(req),
      country: this.getCountry(req),
    });
    await refreshToken.save();
    return refreshToken.refreshToken;
  }

  async findRefreshToken(token: string) {
    const refreshToken = await this.refreshTokenModel.findOne({refreshToken: token});
    if (!refreshToken) {
      throw new UnauthorizedException('User has been logged out.');
    }
    return refreshToken.userId;
  }

  async validateUser(jwtPayload: JwtPayload): Promise<any> {
    const user = await this.userModel.findOne({_id: jwtPayload.userId, verified: true});
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    return user;
  }
  private async findForgotPasswordByEmail(resetPasswordDto: ResetPasswordDto): Promise<ForgotPassword> {
    const forgotPassword = await this.forgotPasswordModel.findOne({
        email: resetPasswordDto.email,
        firstUsed: true,
        finalUsed: false,
        expires: { $gt: new Date() },
    });
    if (!forgotPassword) {
        throw new BadRequestException('Bad request.');
    }
    return forgotPassword;
}
  public jwtExtractor(request) {
    let token = null;
    if (request.header('x-token')) {
    token = request.get('x-token');
  } else if (request.headers.authorization) {
    token = request.headers.authorization.replace('Bearer ', '').replace(' ', '');
  } else if (request.body.token) {
    token = request.body.token.replace(' ', '');
  }
    if (request.query.token) {
    token = request.body.token.replace(' ', '');
  }
    const cryptr = new Cryptr('adesha');
    if (token) {
      try {
        token = cryptr.decrypt(token);
      } catch (err) {
        throw new BadRequestException('Bad request.');
      }
  }
    return token;
}

private async setForgotPasswordFinalUsed(forgotPassword: ForgotPassword) {
  forgotPassword.finalUsed = true;
  await forgotPassword.save();
}
private async resetUserPassword(resetPasswordDto: ResetPasswordDto) {
  const user = await this.userModel.findOne({
      email: resetPasswordDto.email,
      verified: true,
  });
  user.password = resetPasswordDto.password;
  await user.save();
}
  returnJwtExtractor() {
    return this.jwtExtractor;
  }

  getIp(req: Request): string {
    return getClientIp(req);
  }

  getBrowserInfo(req: Request): string {
    return req.header['user-agent'] || 'XX';
  }

  getCountry(req: Request): string {
    return req.header['cf-ipcountry'] ? req.header['cf-ipcountry'] : 'XX';
  }

  encryptText(text: string): string {
    return this.cryptr.encrypt(text);
  }
}
