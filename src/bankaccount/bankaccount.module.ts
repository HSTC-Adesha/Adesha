import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { bankAccountSchema } from './bankaccount.model';
import { BankAccountController } from './bankaccount.controller';
import { BankAccountService } from './bankaccount.service';
import { bankSchema } from '../bank/bank.model';
import { chequeSchema } from '../cheque/cheque.model';
import { ChequeModule } from '../cheque/cheque.module';
import { companySchema } from '../company/company.model';
import { employeeSchema } from '../employee/employee.model';

@Module({
    imports:[
    MongooseModule.forFeature([{name:'BankAccount', schema: bankAccountSchema}]),
    MongooseModule.forFeature([{name:'bank', schema: bankSchema}]),
    MongooseModule.forFeature([{name:'cheque', schema: chequeSchema}]),
    MongooseModule.forFeature([{name:'Company', schema: companySchema}]),
    MongooseModule.forFeature([{name:'Employee', schema: employeeSchema}]),
   ChequeModule ,


],
    controllers: [BankAccountController],
    providers: [BankAccountService],
    exports:[BankAccountService]
})

export class BankAccountModule {}
