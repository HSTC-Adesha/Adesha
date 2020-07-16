import { Module, forwardRef } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { ChequeController} from './cheque.controller';
import { ChequeService } from './cheque.service';
import { chequeSchema } from './cheque.model';
import { chequeBookSchema } from '../chequeBook/chequeBook.model';
import { ChequeBookModule } from '../chequeBook/chequeBook.module';
import { bankSchema } from '../bank/bank.model';
import { BankModule } from '../bank/bank.module';
import { companySchema } from '../company/company.model';
import { CompanyModule } from '../company/company.module';
import { employeeSchema } from '../employee/employee.model';
import { EmployeeModule } from '../employee/employee.module';
import { billSchema } from '../bill/bill.model';
import { BillModule } from '../bill/bill.module';
import { bankAccountSchema } from '../bankaccount/bankaccount.model';
import { BankAccountModule } from '../bankaccount/bankaccount.module';
@Module({
    imports:[
        MongooseModule.forFeature([{name:'Cheque', schema: chequeSchema}]),
        MongooseModule.forFeature([{name:'Bank', schema: bankSchema}]),
        MongooseModule.forFeature([{name:'Company', schema: companySchema}]),
        MongooseModule.forFeature([{name:'Employee', schema: employeeSchema}]),
        MongooseModule.forFeature([{name:'ChequeBook', schema: chequeBookSchema}]),
        MongooseModule.forFeature([{name:'bankaccount', schema: bankAccountSchema}]),
        MongooseModule.forFeature([{name:'Bill', schema: billSchema}]),
        forwardRef(() => BankModule ),
        forwardRef(() => CompanyModule ),
        forwardRef(() => BankAccountModule ),
        forwardRef(() => BillModule ),
      
        BankModule,  CompanyModule, EmployeeModule, ChequeBookModule,  BankAccountModule, BillModule,
    ],
    controllers: [ChequeController],
    providers: [ChequeService],
    exports: [ChequeService],
})

export class ChequeModule {}
