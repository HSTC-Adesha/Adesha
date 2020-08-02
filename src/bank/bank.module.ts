import { Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { BankService } from './bank.service';
import { bankSchema } from './bank.model';
import { BankController } from './bank.controller';
import { companySchema } from '../company/company.model';
import { bankAccountSchema } from '../bankaccount/bankaccount.model';
import { BankAccountModule } from '../bankaccount/bankaccount.module';

@Module({
    imports:[
    MongooseModule.forFeature([{name:'Bank', schema: bankSchema}]),
    MongooseModule.forFeature([{name:'Company', schema: companySchema}]),
    MongooseModule.forFeature([{name:'bankaccount', schema: bankAccountSchema}]),
    BankAccountModule,
],
    controllers: [BankController],
    providers: [BankService],
    exports: [BankService],
    
})

export class BankModule {}
