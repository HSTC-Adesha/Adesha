import { Module, forwardRef } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { bankAccountSchema } from './bankaccount.model';
import { BankAccountController } from './bankaccount.controller';
import { BankAccountService } from './bankaccount.service';
import { bankSchema } from '../bank/bank.model';
import { BankModule } from '../bank/bank.module';
import { chequeSchema } from '../cheque/cheque.model';
import { ChequeModule } from '../cheque/cheque.module';
import { companySchema } from '../company/company.model';
import {CompanyModule} from '../company/company.module';
import { employeeSchema } from '../employee/employee.model';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
    imports:[
    MongooseModule.forFeature([{name:'BankAccount', schema: bankAccountSchema}]),
    MongooseModule.forFeature([{name:'bank', schema: bankSchema}]),
    MongooseModule.forFeature([{name:'cheque', schema: chequeSchema}]),
    MongooseModule.forFeature([{name:'Company', schema: companySchema}]),
    MongooseModule.forFeature([{name:'Employee', schema: employeeSchema}]),
    BankModule,ChequeModule,CompanyModule,EmployeeModule,
],
    controllers: [BankAccountController],
    providers: [BankAccountService],
    exports:[BankAccountService]
    
})

export class BankAccountModule {}
