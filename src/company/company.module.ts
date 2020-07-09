import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { CompanyController} from './company.controller';
import { CompanyService } from './company.service';
import { companySchema } from './company.model';
import { bankAccountSchema } from '../bankaccount/bankaccount.model';
import { bankSchema } from '../bank/bank.model';
import { employeeSchema } from '../employee/employee.model';
import { BankModule } from '../bank/bank.module';
import { BankAccountModule } from '../bankaccount/bankaccount.module';
import { EmployeeModule } from '../employee/employee.module';
import { billSchema } from '../bill/bill.model';
import { BillModule } from '../bill/bill.module';
@Module({
    imports:[
        MongooseModule.forFeature([{name:'Company', schema: companySchema}]),
        MongooseModule.forFeature([{name:'Bank', schema: bankSchema}]),
        MongooseModule.forFeature([{name:'BankAccount', schema: bankAccountSchema}]),
        MongooseModule.forFeature([{name:'Employee', schema: employeeSchema}]),
        MongooseModule.forFeature([{name:'Bills', schema: billSchema}]),
        BankModule, BankAccountModule, EmployeeModule, BillModule
    ],
    controllers: [CompanyController],
    providers: [CompanyService],
    exports: [CompanyService],

})

export class CompanyModule {}

