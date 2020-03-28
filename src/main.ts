import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChequeModule } from './cheque/cheque.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
console.log('app started')
  const options = new DocumentBuilder()
    .setTitle('Adesha API')
    .setDescription('The ADESHA API description')
    .setVersion('1.0.0')
    .build();
    const document = SwaggerModule.createDocument(app, options, {
      include: [
        AuthModule,
        ChequeModule,
        UserModule,
    ],
    });
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('app.listen(3000)')

}
bootstrap();
