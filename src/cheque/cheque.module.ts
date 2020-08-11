import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { ChequeController} from './cheque.controller';
import { ChequeService } from './cheque.service';
import { chequeSchema } from './cheque.model';
import { billSchema } from '../bill/bill.model';
import { BillModule } from '../bill/bill.module';
import { EventsModule } from '../events/events.module';
@Module({
    imports:[
        MongooseModule.forFeature([{name:'Cheque', schema: chequeSchema}]),
        MongooseModule.forFeature([{name:'Bill', schema: billSchema}]),
        BillModule ,EventsModule,
          ],
    controllers: [ChequeController],
    providers: [ChequeService],
    exports: [ChequeService],
})

export class ChequeModule {}
