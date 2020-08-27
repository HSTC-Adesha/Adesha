import { Controller, Post, Get, Param, Patch, Delete, Body} from '@nestjs/common';
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
    @Body ('company') company :string,
    @Body ('comment') employeecomment :string,) {
     return await this.employeesService.insertemployee (
        employeefirstName,
        employeelastName,
        employeerole,
        company,
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
    @Get('firstname/:firstname')
    getEmployeeByFirstName(@Param('First name') employeefirstName: string){
        return this.employeesService.getEmployeeByFirstName(employeefirstName);
    }
    @Get('lastname/:lastname')
    getEmployeeByLastName(@Param('Last name') employeelastName: string){
        return this.employeesService.getEmployeeByLastName(employeelastName);
    }
    @Get('lastname/:lastname')
    getEmployeeByAddress(@Param('Last name') employeelastName: string){
        return this.employeesService.getEmployeeByAddress(employeelastName);
    }
    @Get('role/:role')
    getEmployeeByRole(@Param('role') employeerole: string){
        return this.employeesService.getEmployeeByRole(employeerole);
    } 
    @Get('company/:id')
    getEmployeeByCompany(@Param('id') employeerole: string){
        return this.employeesService.getEmployeeByCompany(employeerole);
    } 
    @Get('comment/:comment')
    getEmployeeByComment(@Param('comment') employeecomment:string,){
        return this.employeesService.getEmployeeByComment(employeecomment);
    }
 
    
    @Patch(':id')
    async updatecompany(
     @Param('id') employeeid: string,
     @Body('firstName') employeefirstName: string,
     @Body('lastName') employeelastName: string,
     @Body('role') employeerole : string,
     @Body('company') employeecompany: string,
     @Body('comment') employeecomment: string,)
     {
         console.log( employeeid,
            employeefirstName,
            employeelastName,
            employeerole,
            employeecompany, 
            employeecomment)
      return await this.employeesService.updateemployee(
        employeeid,
        employeefirstName,
        employeelastName,
        employeerole,
        employeecompany, 
        employeecomment);
     }
     @Patch('delete/:id')
     async removeemployee( @Param('id') employeeid: string,){
         console.log(employeeid)
        await this.employeesService.deleteemployee(employeeid);
         return {success:true};
     }
    }

