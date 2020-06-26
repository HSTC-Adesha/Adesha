import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { bankAccountSchema } from './bankaccount.model';
import { BankAccountController } from './bankaccount.controller';
import { BankAccountService } from './bankaccount.service';
@Module({
    imports:[MongooseModule.forFeature([{name:'BankAccount', schema: bankAccountSchema}])],
    controllers: [BankAccountController],
    providers: [BankAccountService],
    exports:[BankAccountService]
})

export class BankAccountModule {}
