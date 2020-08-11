import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import {Employee } from './employee.model';
import { BankAccountService } from '../bankaccount/bankaccount.service';
import { BankAccount } from '../bankaccount/bankaccount.model';
import { ChequeService } from '../cheque/cheque.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';



@Injectable()
export class EmployeeService {

    private myemployees: Employee[] = [];
    constructor(
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
    @Inject(forwardRef(() => BankAccountService ))
    private readonly bankAccountService:BankAccountService,
    @Inject(forwardRef(() => ChequeService ))  
    private readonly chequeService:ChequeService,
    ) { }
    async insertemployee (employeefirstName: string, employeelastName: string,
        employeeaddress: string, employeerole: string,  employeecompany: string, employeecomment: string) {
       return this.addemployee(employeefirstName, employeelastName, employeeaddress, employeerole,
             employeecompany, employeecomment)
    }
    async addemployee(
        firstName: string,
        lastName: string,
        address: string,
        role: string,
        company: string,
        comment: string) {
        const newemployee = new this.employeeModel({
            firstName,
            lastName,
            address,
            role,
            company,
            comment,
        });
        const result = await newemployee.save();
        return result;
    }
    async getAllemployees() {
        const employees = await this.employeeModel.find().exec()
        return employees.map(employee => ({
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            address: employee.address,
            role: employee.role,
            company: employee.company,
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
            address: employee.address,
            role: employee.role,
            company: employee.company,
            comment:employee.comment,
        };
    }

    async getEmployeeByLastName( employeelastName : string) {
        const employee = await this.findEmployeeByLastName (employeelastName);
        return {
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            address: employee.address,
            role: employee.role,
            company: employee.company,
            comment:employee.comment,
        };
    }
    async getEmployeeByAddress( employeeaddress: string){
        const employee = await this.findEmployeeByAddress (employeeaddress);
        return {
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        address: employee.address,
        role: employee.role,
        company: employee.company,
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
    async getEmployeeByCompany( employeecompany: string){
        const employee = await this.findEmployeeByCompany (employeecompany);
        return {
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        address: employee.address,
        role: employee.role,
        company: employee.company,
        comment:employee.comment,
    };
}
    async getEmployeeByComment(employeecomment: string) {
        const employee = await this.findEmployeeByComment(employeecomment);
        return {
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            address: employee.address,
            role: employee.role,
            company: employee.company,
            comment:employee.comment,
        };
    }

    async updateemployee(
        employeeid: string,
        firstName: string,
        lastName: string,
        address: string,
        role: string,
        company: string,
        comment: string) {
        const updateemployee = await this.findEmployeeById(employeeid);
        if (firstName) {
            updateemployee.firstName= firstName;
        }
        if (lastName) {
            updateemployee.lastName= lastName;
        }
        if (address) {
            updateemployee.address= address;
        }
        if (role) {
            updateemployee.role= role;
        }
        if (company) {
            updateemployee.company= company;
        }
        if (comment) {
            updateemployee.comment= comment;
        }
    
        const result = await updateemployee.save();
        return result;
    }

    async addbankAccountToEmployee(
        employeeid: string,
        bankAccount: string,
        ) {
        let updateemployee :Employee = await this.getEmployeeById(employeeid);
        let theBankAccount :BankAccount = await this.bankAccountService.getBankAccountById(bankAccount);
        if (theBankAccount && updateemployee) {
            updateemployee.bankAccounts.push(theBankAccount.id) ;
            theBankAccount.company = updateemployee.id;
            updateemployee.save();
            theBankAccount.save();
        }
        return updateemployee;
    }
    async addchequeToEmployee(
        employeeid: string,
        cheque: string,
        ) {
        let updateemployee :Employee = await this.getEmployeeById(employeeid);
        let theCheque = await this.chequeService.getChequeById(cheque);
        if (theCheque && updateemployee) {
            updateemployee.cheques.push(theCheque.id) ;
            theCheque.delivredTo = updateemployee.id;
            updateemployee.save();
        
        }
        return updateemployee;
    }
    async removebankaccountFromemployee(
        employeeid: string,
        bankAccount: string,
        ) {
            let updateemployee :Employee = await this.getEmployeeById(employeeid);
            let theBankAccount:BankAccount = await this.bankAccountService.getBankAccountById(bankAccount);
        if (theBankAccount && updateemployee) {
            for ( let i = 0; i < updateemployee.bankAccounts.length; i++) {
                if ( updateemployee.bankAccounts[i] === theBankAccount.id) {
                    updateemployee.bankAccounts.splice(i, 1);
                }
             }
             updateemployee.save();
        }
        return updateemployee;
    }
    async removechequeFromemployee(
        employeeid: string,
        cheque: string,
        ) {
            let updateemployee :Employee = await this.getEmployeeById(employeeid);
            let thecheque = await this.chequeService.getChequeById(cheque);
        if (thecheque && updateemployee) {
            for ( let i = 0; i < updateemployee.cheques.length; i++) {
                if ( updateemployee.cheques[i] === thecheque.id) {
                    updateemployee.cheques.splice(i, 1);
                }
             }
             updateemployee.save();
        }
        return updateemployee;
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

     private async findEmployeeByAddress (address: string): Promise<Employee> {
        let employee ;
        try {

            employee = await this.employeeModel.find({ address });
        } catch (error) {
            throw new NotFoundException(' not found!');
        }
        if (!employee) {
            throw new NotFoundException(' not found!');
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

    private async findEmployeeByCompany (company: string): Promise<Employee> {
        let employee ;
        try {

            employee = await this.employeeModel.find({ company });
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
            throw new NotFoundException('erreur!!');
        }
        return employee;
    }
}





