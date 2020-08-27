import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { CompanyController} from './company.controller';
import { CompanyService } from './company.service';
import { companySchema } from './company.model';
import { employeeSchema } from '../employee/employee.model';
import { EmployeeModule } from '../employee/employee.module';
import { billSchema } from '../bill/bill.model';
import { BillModule } from '../bill/bill.module';
@Module({
    imports:[
        MongooseModule.forFeature([{name:'Company', schema: companySchema}]),
        MongooseModule.forFeature([{name:'Employee', schema: employeeSchema}]),
        MongooseModule.forFeature([{name:'Bill', schema: billSchema}]),
       EmployeeModule, BillModule
    ],
    controllers: [CompanyController],
    providers: [CompanyService],
    exports: [CompanyService],

})

export class CompanyModule {}

