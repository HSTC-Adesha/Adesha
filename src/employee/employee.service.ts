import { Injectable, NotFoundException } from '@nestjs/common';
import {Employee } from './employee.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class EmployeeService {

    private myemployees: Employee[] = [];
    constructor(@InjectModel('Employee') private readonly employeeModel: Model<Employee>) { }
    async insertemployee (employeefirstName: string, employeelastName: string,
        employeerole: string,employeecomment: string) {
        this.addemployee(employeefirstName, employeelastName, 
            employeerole, employeecomment)
    }
    async addemployee(
        firstName: string,
        lastName: string,
        role: string,
        comment: string) {
        const newemployee = new this.employeeModel({
            firstName,
            lastName,
            role,
            comment,
        });
        const result = await newemployee.save();
        return result.id as string;
    }
    async getAllemployees() {
        const employees = await this.employeeModel.find().exec()
        return employees.map(employee => ({
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            role: employee.role,
            comment:employee.comment,
        }));
    }

    async getEmployeeById(employeeid: string) {
        return await this.findEmployeeById(employeeid);

    }

    async getEmployeeByFirstName(employeefirstName: string) {
        const employee = await this.findEmployeeByFirstName(employeefirstName);
        return {
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            role: employee.role,
            comment:employee.comment,
        };
    }

    async getEmployeeByLastName( employeelastName : string) {
        const employee = await this.findEmployeeByLastName (employeelastName);
        return {
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            role: employee.role,
            comment:employee.comment,
        };
    }


    async getEmployeeByRole(employeerole: string) {
        const employee = await this.findEmployeeByRole(employeerole);
        return {
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            role: employee.role,
            comment:employee.comment,
        };
    }
    async getEmployeeByComment(employeecomment: string) {
        const employee = await this.findEmployeeByComment(employeecomment);
        return {
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            role: employee.role,
            comment:employee.comment,
        };
    }

    async updateemployee(
        employeeid: string,
        firstName: string,
        lastName: string,
        role: string,
        comment: string) {
        const updateemployee = await this.findEmployeeById(employeeid);
        if (firstName) {
            updateemployee.firstName= firstName;
        }
        if (lastName) {
            updateemployee.lastName= lastName;
        }
        if (role) {
            updateemployee.role= role;
        }
        if (comment) {
            updateemployee.comment= comment;
        }
    
        const result = await updateemployee.save();
        return result;
    }

    async deleteemployee(employeeid: string) {
        await this.employeeModel.findByIdAndDelete(employeeid);

    }

    private async findEmployeeById (id: string): Promise<Employee> {
        let employee;
        try {
            employee = await this.employeeModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!employee) {
            throw new NotFoundException('erreur!!');
        }

        return employee;
    }
    private async findEmployeeByFirstName (firstName: string): Promise<Employee> {
        let employee;
        try {

            employee = await this.employeeModel.find({ firstName });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!employee) {
            throw new NotFoundException('erreur!!');
        }

        return employee;
    }
    private async findEmployeeByLastName (lastName: string): Promise<Employee> {
        let employee;
        try {

            employee = await this.employeeModel.find({ lastName });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!employee) {
            throw new NotFoundException('erreur!!');
        }

        return employee;
    }
   
    private async findEmployeeByRole (role: string): Promise<Employee> {
        let employee ;
        try {

            employee = await this.employeeModel.find({ role });
        } catch (error) {
            throw new NotFoundException(' not found!');
        }
        if (!employee) {
            throw new NotFoundException(' not found!');
        }

        return employee;
    }

    private async findEmployeeByComment(comment: string): Promise<Employee> {
        let employee;
        try {

            employee = await this.employeeModel.find({ comment });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!employee) {
            throw new NotFoundException('erreur!!');1
        }
        return employee;
    }
}





