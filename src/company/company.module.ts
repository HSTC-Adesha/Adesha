import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { CompanyController} from './company.controller';
import { CompanyService } from './company.service';
import { companySchema } from './company.model';
@Module({
    imports:[MongooseModule.forFeature([{name:'Company', schema: companySchema}])],
    controllers: [CompanyController],
    providers: [CompanyService],
})

export class    CompanyModule {}

