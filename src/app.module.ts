import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from './employee/employee.module';
import { CompanyModule } from './company/company.module';
import { BankModule } from './bank/bank.module';
import { BillModule } from './bill/bill.module';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { LoggingInterceptor } from './shared/logger/logging.interceptor';
import { HttpErrorFilter } from './shared/logger/http-error.filter';
import { ChequeBookModule } from './chequeBook/chequeBook.module';
import { ChequeModule } from './cheque/cheque.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EventsModule } from './events/events.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),
    MongooseModule.forRoot("mongodb://localhost/adeshaDB"),
    AuthModule,
    UserModule,
    ChequeModule,
    BankModule,
    BillModule,
    ChequeBookModule,
    CompanyModule,
    EmployeeModule,
    EventsModule,
  ],
  controllers: [
    AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }, {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}