import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { BankController} from './bank.controller';
import { BankService } from './bank.service';
import { bankSchema } from './bank.model';
@Module({
    imports:[MongooseModule.forFeature([{name:'Bank', schema: bankSchema}])],
    controllers: [BankController],
    providers: [BankService],
})

export class BankModule {}
