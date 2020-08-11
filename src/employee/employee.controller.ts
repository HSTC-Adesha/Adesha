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
    @Body('address') employeeaddress :string,
    @Body ('role') employeerole :string,
    @Body ('company') employeecompany :string,
    @Body ('comment') employeecomment :string,) {
     return await this.employeesService.insertemployee (
        employeefirstName,
        employeelastName,
        employeeaddress,
        employeerole,
        employeecompany, 
        employeecomment);
    }
    @Get()
    async getAllemployees(){
        const employees = await this.employeesService.getAllemployees();
        return employees;
    }
    @Get('id/:employeeid')
    getEmployeeById(@Param('employeeid') employeeid: string){
        return this.employeesService.getEmployeeById(employeeid);
    }
    @Get('Firstname/:Firstname')
    getEmployeeByFirstName(@Param('First name') employeefirstName: string){
        return this.employeesService.getEmployeeByFirstName(employeefirstName);
    }
    @Get('Lastname/:Lastname')
    getEmployeeByLastName(@Param('Last name') employeelastName: string){
        return this.employeesService.getEmployeeByLastName(employeelastName);
    }
    @Get('Lastname/:Lastname')
    getEmployeeByAddress(@Param('Last name') employeelastName: string){
        return this.employeesService.getEmployeeByAddress(employeelastName);
    }
    @Get('role/:role')
    getEmployeeByRole(@Param('role') employeerole: string){
        return this.employeesService.getEmployeeByRole(employeerole);
    } 
    @Get('role/:role')
    getEmployeeByCompany(@Param('role') employeerole: string){
        return this.employeesService.getEmployeeByCompany(employeerole);
    } 
    @Get('comment/:comment')
    getEmployeeByComment(@Param('comment') employeecomment:string,){
        return this.employeesService.getEmployeeByComment(employeecomment);
    }
    @Post('bankaccount/:employeeid')
    addbankaccount(@Param('employeeid') employeeid: string,
        @Body('bankAccount') bankAccount: string
    ) {
        return this.employeesService.addbankAccountToEmployee(employeeid, bankAccount);
    }
    @Post('cheque/:employeeid')
    addcheque(@Param('employeeid') employeeid: string,
        @Body('cheque') cheque: string
    ) {
        return this.employeesService.addchequeToEmployee(employeeid, cheque);
    }
    @Patch('bankaccount/:employeeid')
    removebankaccount(@Param('employeeid') employeeid: string,
        @Body('bankAccount') bankAccount: string
    ) {
        return this.employeesService.removebankaccountFromemployee(employeeid, bankAccount);
    }

    @Patch('bankaccount/:employeeid')
    removecheque(@Param('employeeid') employeeid: string,
        @Body('cheque') cheque: string
    ) {
        return this.employeesService.removechequeFromemployee(employeeid, cheque);
    }
    
    
    @Patch(':id')
    async updatecompany(
     @Param('id') employeeid: string,
     @Body('firstName') employeefirstName: string,
     @Body('lastName') employeelastName: string,
     @Body('address') employeeaddress: string,
     @Body('role') employeerole : string,
     @Body('company') employeecompany: string,
     @Body('comment') employeecomment: string,)
     {
        await this.employeesService.updateemployee(
        employeeid,
        employeefirstName,
        employeelastName,
        employeeaddress,
        employeerole,
        employeecompany, 
        employeecomment);
        return null;
     }
     @Delete(':id')
     async removeemployee( @Param('id') employeeid: string,){
        await this.employeesService.deleteemployee(employeeid);
         return null;
     }
    }

