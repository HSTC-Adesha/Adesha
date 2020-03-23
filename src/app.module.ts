import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule }from 'src/authen/auth.module';
import { UsersModule } from './theusers/users.module';
import{MongooseModule} from '@nestjs/mongoose';
import { Mychecksmodule } from "./myChecks/myChecks.module";

@Module({
  imports: [AuthModule, UsersModule,  Mychecksmodule,MongooseModule.forRootAsync({
    useFactory: () => ({
      
      uri: 'mongodb://localhost/adesha',
    }),
  }),
 
],
controllers: [AppController],
providers: [AppService]
})


export class AppModule {}
