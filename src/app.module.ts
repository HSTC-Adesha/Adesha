import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { meschequesmodule } from "./mescheques/mescheque.module";

@Module({
  imports: [AuthModule, UsersModule, meschequesmodule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
