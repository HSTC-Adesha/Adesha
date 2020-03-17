import { Module } from '@nestjs/common';
import{MongooseModule} from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { mychecksmodule } from "./myChecks/myChecks.module";

@Module({
  imports: [AuthModule, UsersModule, mychecksmodule,MongooseModule.forRoot('mongodb+srv://houcem:AJobieemVSNe46mN@cluster0-nhzzy.mongodb.net/nestjs-demo ?retryWrites=true&w=majority  ') ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
