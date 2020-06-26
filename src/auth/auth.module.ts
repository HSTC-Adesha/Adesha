import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schemas/user.schema';
import { RefreshTokenSchema } from './schemas/refresh-token.schema';
import { AuthController } from './auth.controller';
import { UserManagementModule } from '../shared/userManagement/usermanagement.module';
import { ForgotPasswordSchema } from 'src/user/schemas/forgot-password.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ForgotPassword', schema: ForgotPasswordSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'RefreshToken', schema: RefreshTokenSchema }]),
     forwardRef(() => UserManagementModule),
    PassportModule,
    JwtModule.register({
      secret: 'adesha',
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}