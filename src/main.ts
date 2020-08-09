import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { EmployeeModule } from "./employee/employee.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { BankModule } from "./bank/bank.module";
import { BillModule } from "./bill/bill.module";
import { CompanyModule } from "./company/company.module";
import { warn } from "console";
import { ChequeBookModule } from "./chequeBook/chequeBook.module";
import { ChequeModule } from "./cheque/cheque.module";
import { join } from "path";
import { ServeStaticModule } from '@nestjs/serve-static';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    // disableErrorMessages: true,
  }));
  // app.setGlobalPrefix('k-data/v1');
  const options = new DocumentBuilder()
    .setTitle('Adesha API')
    .setDescription('Adesha API description ...')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [
      AuthModule,
      UserModule,
      ChequeModule,
      BankModule,
      BillModule,
      ChequeBookModule,
      CompanyModule,
      EmployeeModule
  ],
  });
  SwaggerModule.setup('api', app, document);
  app.enableCors();

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);
  warn(`Adesha APP IS LISTENING TO PORT ${PORT}`);
}
bootstrap();
