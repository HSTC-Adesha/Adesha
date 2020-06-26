import { Injectable, NotFoundException } from '@nestjs/common';
import { Company } from './company.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BankAccount } from '../bankaccount/bankaccount.model';
import { Bank } from '../bank/bank.model';
import { Employee } from '../employee/employee.model';
import { BankService } from '../bank/bank.service';
import { EmployeeService } from '../employee/employee.service';
import { BankAccountService } from '../bankaccount/bankaccount.service';


@Injectable()
export class CompanyService {

    constructor(
        @InjectModel('Company') private readonly companyModel: Model<Company>,
        @InjectModel('BankAccount') private readonly bankAccountModel: Model<BankAccount>,
        @InjectModel('Bank') private readonly bankModel: Model<Bank>,
        @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
        private readonly bankAccountService:BankAccountService,
        private readonly bankService:BankService,
        private readonly employeeService:EmployeeService,
        ) { }
    async insertcompany (companyname: string, companycityOrCountry: string,
        companyaddress: string, companytype: string,
        companycomment: string) {
        return this.addcompany(companyname, companycityOrCountry, 
         companyaddress, companytype, companycomment)
    }
    async addcompany(
        name: string,
        cityOrCountry: string,
        address: string,
        type: string,
        comment: string) {
        let newcompany = new this.companyModel({});
        if (name) {
            newcompany.name= name;
        }
        if (cityOrCountry) {
            newcompany.cityOrCountry= cityOrCountry;
        }
        if (address) {
            newcompany.address= address;
        }

        if (type) {
            newcompany.type= type;
        }
        if (comment) {
            newcompany.comment= comment;
        }      
        const result = await newcompany.save();
        return result as Company;
    }
    async getcompanies() {
        return await this.companyModel.find().exec()
    }

    async getCompanyById(companyid: string) {
        return await this.findcompany(companyid);
    }

    async getCompanyByName(companyname: string) {
      return await this.findname(companyname);
    }

    async getCompanyByCity( companycityOrCountry: string) {
        return await this.findcityOrCountry(companycityOrCountry);
    }
    async getCompanyByAdress(companyaddress: string) {
        return await this.findaddress(companyaddress);
    }

    async getCompanyByType(companytype: string) {
        return await this.findtype(companytype);
    }
    async updateCompany(
        companyid: string,
        name: string,
        cityOrCountry: string,
        address: string,
        type: string,
        comment: string) {
        const updatecompany = await this.findcompany(companyid);
        if (name) {
            updatecompany.name= name;
        }
        if (cityOrCountry) {
            updatecompany.cityOrCountry= cityOrCountry;
        }
        if (address) {
            updatecompany.address= address;
        }

        if (type) {
            updatecompany.type= type;
        }
        if (comment) {
            updatecompany.comment= comment;
        }
        const result = await updatecompany.save();
        return result;
    }
    async addEmployeeToCompany(
        companyid: string,
        employee: string,
        ) {
        let updatecompany :Company = await this.findcompany(companyid);
        let theEmployee:Employee = await this.employeeService.getEmployeeById(employee);
        if (theEmployee && updatecompany) {
            updatecompany.employees.push(theEmployee.id) ;
            theEmployee.company = updatecompany.id;
            updatecompany.save();
            theEmployee.save();
        }
        return updatecompany;
    }
    async addBankToCompany(
        companyid: string,
        bank: string,
        ) {
        let updatecompany :Company = await this.findcompany(companyid);
        let theBank:Bank = await this.bankService.getBankById(bank);
        if (theBank && updatecompany) {
            updatecompany.banks.push(theBank.id) ;
            updatecompany.save();
        }
        return updatecompany;
    }
    async addBankAccountToCompany(
        companyid: string,
        bankAccount: string,
        ) {
        let updatecompany :Company = await this.findcompany(companyid);
        let theBankAccount:BankAccount = await this.bankAccountService.getBankAccountById(bankAccount);
        if (theBankAccount && updatecompany) {
            updatecompany.bankAccounts.push(theBankAccount.id) ;
            updatecompany.save();
        }
        return updatecompany;
    }
    async removeEmployeeFromCompany(
        companyid: string,
        employee: string,
        ) {
        let updatecompany :Company = await this.findcompany(companyid);
        let theEmployee:Employee = await this.employeeService.getEmployeeById(employee);
        if (theEmployee && updatecompany) {
            for ( let i = 0; i < updatecompany.employees.length; i++) {
                if ( updatecompany.employees[i] === theEmployee.id) {
                    updatecompany.employees.splice(i, 1);
                }
             }
            updatecompany.save();
        }
        return updatecompany;
    }
    async removeBankFromCompany(
        companyid: string,
        bank: string,
        ) {
        let updatecompany :Company = await this.findcompany(companyid);
        let theBank:Bank = await this.bankService.getBankById(bank);
        if (theBank && updatecompany) {
            for ( let i = 0; i < updatecompany.banks.length; i++) {
                if ( updatecompany.banks[i] === theBank.id) {
                    updatecompany.banks.splice(i, 1);
                }
             }
            updatecompany.save();
        }
        return updatecompany;
    }
    async removeBankAccountFromCompany(
        companyid: string,
        bankAccount: string,
        ) {
        let updatecompany :Company = await this.findcompany(companyid);
        let theBankAccount:BankAccount = await this.bankAccountService.getBankAccountById(bankAccount);
        if (theBankAccount && updatecompany) {
            for ( let i = 0; i < updatecompany.bankAccounts.length; i++) {
                if ( updatecompany.bankAccounts[i] === theBankAccount.id) {
                    updatecompany.bankAccounts.splice(i, 1);
                }
             }            
             updatecompany.save();
        }
        return updatecompany;
    }
    async deleteCompany(companyid: string) {
        await this.companyModel.findByIdAndDelete(companyid);
    }

    private async findcompany (id: string): Promise<Company> {
        let company;
        try {
            company = await this.companyModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!company) {
            throw new NotFoundException('erreur!!');
        }

        return company;
    }
    private async findname(name: string): Promise<Company> {
        let company;
        try {

            company = await this.companyModel.find({ name });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!company) {
            throw new NotFoundException('erreur!!');
        }

        return company;
    }
    private async findcityOrCountry (cityOrCountry: string): Promise<Company> {
        let company;
        try {

            company = await this.companyModel.find({ cityOrCountry });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!company) {
            throw new NotFoundException('erreur!!');
        }

        return company;
    }
   
    private async findaddress(address: string): Promise<Company> {
        let company ;
        try {

            company = await this.companyModel.find({ address });
        } catch (error) {
            throw new NotFoundException(' not found!');
        }
        if (!company) {
            throw new NotFoundException(' not found!');
        }

        return company;
    }

    private async findtype (type: string): Promise<Company> {
        let company;
        try {

            company = await this.companyModel.find({ type });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!company) {
            throw new NotFoundException('erreur!!');
        }

        return company;
    }

  
}