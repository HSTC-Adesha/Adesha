import { Controller, Post, Get, Param, Patch, Delete, Body} from '@nestjs/common';
// import {HttpExceptionFilter} from '../filters/http-exception.filter';
import { EmployeeService } from './employee.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Employee')
@Controller('employee')
export class EmployeeController {
    constructor ( private readonly employeesService: EmployeeService) {
    }
    @Post()
    async  addemployee(
    @Body('firstName') employeefirstName :string,
    @Body('lastName') employeelastName :string,
    @Body ('role') employeerole :string,
    @Body ('comment') employeecomment :string,) {
     const generateid = await this.employeesService.insertemployee (
        employeefirstName,
        employeelastName,
        employeerole,
        employeecomment);
            return {id: generateid};
    }
    @Get()
    async getAllemployees(){
        const employees = await this.employeesService.getemployees();
        return employees;
    }
    @Get('id/:employeeid')
    getEMPLOYEE(@Param('employeeid') employeeid: string){
        return this.employeesService.getEmployeeById(employeeid);
    }
    @Get('Firstname/:Firstname')
    gettheemployee(@Param('First name') employeefirstName: string){
        return this.employeesService.gettheemployee(employeefirstName);
    }
    @Get('Lastname/:Lastname')
    getTheEmployee(@Param('Last name') employeelastName: string){
        return this.employeesService.getTheEmployee(employeelastName);
    }
    @Get('role/:role')
    getemployee(@Param('role') employeerole: string){
        return this.employeesService.getemployee(employeerole);
    }   
    @Get('comment/:comment')
    gettheEmployee(@Param('comment') employeecomment:string,){
        return this.employeesService.gettheEmployee(employeecomment);
    }
    @Patch(':id')
    async updatecompany(
     @Param('id') companyid: string,
     @Body('firstName') employeefirstName: string,
     @Body('lastName') employeelastName: string,
     @Body('role') employeerole : string,
     @Body('comment') companycomment: string,)
     {
        await this.employeesService.updateemployee(
        companyid,
        employeefirstName,
        employeelastName,
        employeerole, 
        companycomment);
        return null;
     }
     @Delete(':id')
     async removeemployee( @Param('id') employeeid: string,){
        await this.employeesService.deleteemployee(employeeid);
         return null;
     }
    }

