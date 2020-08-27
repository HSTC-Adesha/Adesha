import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { EmployeeController} from './employee.controller';
import { EmployeeService } from './employee.service';
import { employeeSchema } from './employee.model';
import { companySchema } from './../company/company.model';
import { CompanyModule } from './../company/company.module';


@Module({
    imports:[
        MongooseModule.forFeature([{name:'Employee', schema: employeeSchema}]),
        MongooseModule.forFeature([{name:'Company', schema: companySchema}]),
        
    ],
    controllers: [EmployeeController],
    providers: [EmployeeService],
    exports: [EmployeeService],

})

export class    EmployeeModule {}
