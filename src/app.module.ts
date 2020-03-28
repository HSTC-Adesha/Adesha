import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import{MongooseModule} from '@nestjs/mongoose';
import { ChequeModule } from "./cheque/cheque.module";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule, 
    UserModule, 
    ChequeModule,
    MongooseModule.forRootAsync({
    useFactory: () => ({  
      uri: 'mongodb://localhost/adesha',
    }),
  }),
 
],
controllers: [AppController],
providers: [AppService]
})


export class AppModule {}
