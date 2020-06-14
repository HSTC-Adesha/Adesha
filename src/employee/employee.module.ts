import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { EmployeeController} from './employee.controller';
import { EmployeeService } from './employee.service';
import { employeeSchema } from './employee.model';
@Module({
    imports:[MongooseModule.forFeature([{name:'Employee', schema: employeeSchema}])],
    controllers: [EmployeeController],
    providers: [EmployeeService],
})

export class    EmployeeModule {}
