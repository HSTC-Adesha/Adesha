import { Module, forwardRef } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { BillController} from './bill.controller';
import { BillService } from './bill.service';
import { billSchema } from './bill.model';
import { chequeSchema } from '../cheque/cheque.model';
import { ChequeModule } from '../cheque/cheque.module';
import { companySchema } from '../company/company.model';
import { CompanyModule } from '../company/company.module';

@Module({
    imports:[
    MongooseModule.forFeature([{name:'Bill', schema: billSchema}]),
    MongooseModule.forFeature([{name:'Cheques', schema: chequeSchema}]),
    MongooseModule.forFeature([{name:'Company', schema: companySchema}]),
    forwardRef(() => ChequeModule ),
    ChequeModule, CompanyModule
],
    controllers: [BillController],
    providers: [BillService],
})

export class BillModule {}
