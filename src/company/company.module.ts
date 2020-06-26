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
import { EmployeeModule } from 'src/employee/employee.module';
@Module({
    imports:[
        MongooseModule.forFeature([{name:'Company', schema: companySchema}]),
        MongooseModule.forFeature([{name:'Bank', schema: bankSchema}]),
        MongooseModule.forFeature([{name:'BankAccount', schema: bankAccountSchema}]),
        MongooseModule.forFeature([{name:'Employee', schema: employeeSchema}]),
        BankModule,BankAccountModule,EmployeeModule
    ],
    controllers: [CompanyController],
    providers: [CompanyService],
    exports: [CompanyService],

})

export class CompanyModule {}

