import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { ChequeBookController} from './chequeBook.controller';
import { ChequeBookService } from './chequeBook.service';
import { chequeBookSchema } from './chequeBook.model';
import { bankSchema } from '../bank/bank.model';
import { companySchema } from '../company/company.model';
import { employeeSchema } from '../employee/employee.model';
import { chequeSchema } from '../cheque/cheque.model';
import { ChequeModule } from '../cheque/cheque.module';
@Module({
    imports:[
        MongooseModule.forFeature([{name:'ChequeBook', schema: chequeBookSchema}]),
        MongooseModule.forFeature([{name:'Bank', schema: bankSchema}]),
        MongooseModule.forFeature([{name:'Company', schema: companySchema}]),
        MongooseModule.forFeature([{name:'Employee', schema: employeeSchema}]),
        MongooseModule.forFeature([{name:'Cheque', schema: chequeSchema}]),
        ChequeModule,
    ],
    controllers: [ChequeBookController],
    providers: [ChequeBookService],
    exports: [ChequeBookService],

})

export class ChequeBookModule {}
