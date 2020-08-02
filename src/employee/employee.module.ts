import { Module, forwardRef } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { EmployeeController} from './employee.controller';
import { EmployeeService } from './employee.service';
import { employeeSchema } from './employee.model';
import { companySchema } from '../company/company.model';
import {CompanyModule} from '../company/company.module';
import { bankAccountSchema } from '../bankaccount/bankaccount.model';
import { BankAccountModule } from '../bankaccount/bankaccount.module';
import { chequeSchema } from '../cheque/cheque.model';
import { ChequeModule } from '../cheque/cheque.module';
@Module({
    imports:[
        MongooseModule.forFeature([{name:'Company', schema: companySchema}]),
        MongooseModule.forFeature([{name:'Employee', schema: employeeSchema}]),
        MongooseModule.forFeature([{name:'bankaccount', schema: bankAccountSchema}]),
        MongooseModule.forFeature([{name:'Cheque', schema: chequeSchema}]),
        forwardRef(() => BankAccountModule ),
        CompanyModule,BankAccountModule, ChequeModule,
    ],
    controllers: [EmployeeController],
    providers: [EmployeeService],
    exports: [EmployeeService],

})

export class    EmployeeModule {}
