import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { BankService } from './bank.service';
import { bankSchema } from './bank.model';
import { BankController } from './bank.controller';
@Module({
    imports:[MongooseModule.forFeature([{name:'Bank', schema: bankSchema}])],
    controllers: [BankController],
    providers: [BankService],
    exports: [BankService],
    
})

export class BankModule {}
