import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { ChequeBookController} from './chequeBook.controller';
import { ChequeBookService } from './chequeBook.service';
import { chequeBookSchema } from './chequeBook.model';
@Module({
    imports:[MongooseModule.forFeature([{name:'ChequeBook', schema: chequeBookSchema}])],
    controllers: [ChequeBookController],
    providers: [ChequeBookService],
})

export class ChequeBookModule {}
