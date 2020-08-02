import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { BillController} from './bill.controller';
import { BillService } from './bill.service';
import { billSchema } from './bill.model';
import { chequeSchema } from '../cheque/cheque.model';
import { companySchema } from '../company/company.model';

@Module({
    imports:[
    MongooseModule.forFeature([{name:'Bill', schema: billSchema}]),
    MongooseModule.forFeature([{name:'Cheques', schema: chequeSchema}]),
    MongooseModule.forFeature([{name:'Company', schema: companySchema}]),
],
    controllers: [BillController],
    providers: [BillService],
    exports:[BillService]
})

export class BillModule {}
