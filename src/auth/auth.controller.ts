
import { Controller, Get, Post, Body, UseGuards, Req, HttpCode, HttpStatus, Param, Patch, Delete } from '@nestjs/common';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { Request } from 'express';
import { RolesGuard } from './guards/roles.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { VerifyUuidDto } from './dto/verify-uuid.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
    ApiCreatedResponse,
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiConflictResponse,
    ApiUnauthorizedResponse,
    ApiOkResponse,
    ApiUseTags,
} from '@nestjs/swagger';
@ApiUseTags('APP')
@Controller('app')
@UseGuards(RolesGuard)
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({ description: 'The record has been successfully created.' })
    @ApiBadRequestResponse({ description: 'email address most be unique.' })
    @ApiBadRequestResponse({ description: 'Data validation failed or Bad request..' })
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.authService.create(createUserDto);
    }

    @Get('verify-email/:verifyCode')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'User has been successfully verified.' })
    @ApiBadRequestResponse({ description: 'Data validation failed or Bad request..' })
    async verifyEmail(@Req() req: Request, @Param('verifyCode') verifyUuidDto: string) {
        return await this.authService.verifyEmail(req, verifyUuidDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'User has been successfully logged in and tokens generated.' })
    @ApiNotFoundResponse({ description: 'User not found wrong email or password.' })
    @ApiConflictResponse({ description: 'User blocked try later.' })
    @ApiBadRequestResponse({ description: 'Data validation failed or Bad request.' })
    async login(@Req() req: Request, @Body() loginUserDto: LoginUserDto) {
        return await this.authService.login(req, loginUserDto);
    }

    @Post('refresh-access-token')
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({ description: 'Access token has been generated successfully.' })
    @ApiUnauthorizedResponse({ description: 'User has been Logged out.' })
    @ApiBadRequestResponse({ description: 'Data validation failed or Bad request.' })
    async refreshAccessToken(@Body() refreshAccessTokenDto: RefreshAccessTokenDto) {
        return await this.authService.refreshAccessToken(refreshAccessTokenDto);
    }

    // @Post('forgot-password')
    // @HttpCode(HttpStatus.OK)
    // @ApiOkResponse({ description: 'Verification has been sent.' })
    // @ApiNotFoundResponse({ description: 'User not found.' })
    // @ApiBadRequestResponse({ description: 'Data validation failed or Bad request.' })
    // async forgotPassword(@Req() req: Request, @Body() createForgotPasswordDto: CreateForgotPasswordDto) {
    //     return await this.authService.forgotPassword(req, createForgotPasswordDto);
    // }

    // @Post('forgot-password-verify')
    // @HttpCode(HttpStatus.OK)
    // @ApiOkResponse({ description: 'Now user can reset his/her password.' })
    // @ApiBadRequestResponse({ description: 'Data validation failed or Bad request.' })
    // async forgotPasswordVerify(@Req() req: Request, @Body() verifyUuidDto: VerifyUuidDto) {
    //     return await this.authService.forgotPasswordVerify(req, verifyUuidDto);
    // }

    @Post('reset-password')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Password has been successfully changed.' })
    @ApiBadRequestResponse({ description: 'Data validation failed or Bad request.' })
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return await this.authService.resetPassword(resetPasswordDto);
    }

}
