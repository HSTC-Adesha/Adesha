import { Module } from '@nestjs/common';
import{MongooseModule} from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Mychecksmodule } from "./myChecks/myChecks.module";

@Module({
  imports: [AuthModule, UsersModule, Mychecksmodule,MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: 'mongodb://localhost/adesha',
    }),
  }),
],
})
export class AppModule {}

