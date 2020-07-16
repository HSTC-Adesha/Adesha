import { Module, forwardRef } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { ChequeBookController} from './chequeBook.controller';
import { ChequeBookService } from './chequeBook.service';
import { chequeBookSchema } from './chequeBook.model';
import { bankSchema } from '../bank/bank.model';
import { BankModule } from '../bank/bank.module';
import { companySchema } from '../company/company.model';
import { CompanyModule } from '../company/company.module';
import { employeeSchema } from '../employee/employee.model';
import { EmployeeModule } from '../employee/employee.module';
import { chequeSchema } from '../cheque/cheque.model';
import { ChequeModule } from '../cheque/cheque.module';
@Module({
    imports:[
        MongooseModule.forFeature([{name:'ChequeBook', schema: chequeBookSchema}]),
        MongooseModule.forFeature([{name:'Bank', schema: bankSchema}]),
        MongooseModule.forFeature([{name:'Company', schema: companySchema}]),
        MongooseModule.forFeature([{name:'Employee', schema: employeeSchema}]),
        MongooseModule.forFeature([{name:'Cheque', schema: chequeSchema}]),
        forwardRef(() => BankModule ),
        forwardRef(() => CompanyModule ),
        forwardRef(() => EmployeeModule ),
        BankModule,  CompanyModule, EmployeeModule, ChequeModule,
    ],
    controllers: [ChequeBookController],
    providers: [ChequeBookService],
    exports: [ChequeBookService],

})

export class ChequeBookModule {}
