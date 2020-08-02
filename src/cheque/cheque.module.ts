import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { ChequeController} from './cheque.controller';
import { ChequeService } from './cheque.service';
import { chequeSchema } from './cheque.model';
import { billSchema } from '../bill/bill.model';
import { BillModule } from '../bill/bill.module';
@Module({
    imports:[
        MongooseModule.forFeature([{name:'Cheque', schema: chequeSchema}]),
        MongooseModule.forFeature([{name:'Bill', schema: billSchema}]),
        BillModule ,
          ],
    controllers: [ChequeController],
    providers: [ChequeService],
    exports: [ChequeService],
})

export class ChequeModule {}
