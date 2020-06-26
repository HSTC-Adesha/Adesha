import { Module, forwardRef } from '@nestjs/common';
import { UserManagementService } from './usermanagement.service';
import { UserModule } from '../../user/user.module';
import { AuthModule } from '../../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    forwardRef(() =>AuthModule),
        forwardRef(() => UserModule)],
    controllers: [],
    providers: [UserManagementService],
    exports: [UserManagementService],
})
export class UserManagementModule { }
