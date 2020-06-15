import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { ChequeController} from './cheque.controller';
import { ChequeService } from './cheque.service';
import { chequeSchema } from './cheque.model';
@Module({
    imports:[MongooseModule.forFeature([{name:'Cheque', schema: chequeSchema}])],
    controllers: [ChequeController],
    providers: [ChequeService],
})

export class ChequeModule {}
