import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { BillController} from './bill.controller';
import { BillService } from './bill.service';
import { billSchema } from './bill.model';
@Module({
    imports:[MongooseModule.forFeature([{name:'Bill', schema: billSchema}])],
    controllers: [BillController],
    providers: [BillService],
})

export class BillModule {}
