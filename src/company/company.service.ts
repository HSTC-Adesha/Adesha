import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { Company } from './company.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BankAccount } from '../bankaccount/bankaccount.model';
import { Bank } from '../bank/bank.model';
import { Employee } from '../employee/employee.model';
import { BankService } from '../bank/bank.service';
import { EmployeeService } from '../employee/employee.service';
import { BankAccountService } from '../bankaccount/bankaccount.service';
import { BillService } from '../bill/bill.service';
@Injectable()
export class CompanyService {

    constructor(
        @InjectModel('Company') private readonly companyModel: Model<Company>,

        @Inject(forwardRef(() => BankAccountService ))
        private readonly bankAccountService:BankAccountService,
        private readonly bankService:BankService,
        @Inject(forwardRef(() => EmployeeService ))
        private readonly employeeService:EmployeeService,
        @Inject(forwardRef(() => BillService ))
        private readonly billService:BillService,
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
    async getAllcompanies() {
        return await this.companyModel.find().populate("banks").populate("bankAccounts").populate("bills").populate("employees").exec()
    }

    async getCompanyById(companyid: string) {
        return await this.findCompanyById(companyid);
    }

    async getCompanyByName(companyname: string) {
      return await this.findCompanyByName(companyname);
    }

    async getCompanyByCity( companycityOrCountry: string) {
        return await this.findCompanyByCity(companycityOrCountry);
    }
    async getCompanyByAdress(companyaddress: string) {
        return await this.findCompanyByAdress(companyaddress);
    }

    async getCompanyByType(companytype: string) {
        return await this.findCompanyByType(companytype);
    }
    async getCompanyemployee(companybankAccounts: string) {
        return await this.findCompanyemployee(companybankAccounts);
    }
    async getCompanyBybankaccount(companybankAccounts: string) {
        return await this.findCompanyBybankaccount(companybankAccounts);
    }
    async getCompanyBybank(companybanks: string) {
        return await this.findCompanyBybank(companybanks);
    }
    async getCompanyBybill(companybills: string) {
        return await this.findCompanyBybill(companybills);
    }
    async updateCompany(
        companyid: string,
        name: string,
        cityOrCountry: string,
        address: string,
        type: string,
        comment: string) {
        const updatecompany = await this.findCompanyById(companyid);
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
        let updatecompany :Company = await this.findCompanyById(companyid);
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
        let updatecompany :Company = await this.findCompanyById(companyid);
        let theBank:Bank = await this.bankService.getBankById(bank);
        if (theBank && updatecompany) {
            updatecompany.banks.push(theBank.id) ;
            theBank.company = updatecompany.id;
            updatecompany.save();
            theBank.save();
        }
        return updatecompany;
    }
    async addBankAccountToCompany(
        companyid: string,
        bankAccount: string,
        ) {
        let updatecompany :Company = await this.findCompanyById(companyid);
        let theBankAccount:BankAccount = await this.bankAccountService.getBankAccountById(bankAccount);
        if (theBankAccount && updatecompany) {
            updatecompany.bankAccounts.push(theBankAccount.id) ;
            theBankAccount.company = updatecompany.id;
            updatecompany.save();
            theBankAccount.save();
        }
        return updatecompany;
    }
    async addBillToCompany(
        companyid: string,
        bill: string,
        ) {
        let updatecompany :Company = await this.findCompanyById(companyid);
        let theBill = await this.billService.getBillById(bill);
        if (theBill && updatecompany) {
            updatecompany.bills.push(theBill.id);
            theBill.company = updatecompany.id;
            updatecompany.save();
            
        }
        return updatecompany;
    }
    async removeEmployeeFromCompany(
        companyid: string,
        employee: string,
        ) {
        let updatecompany :Company = await this.findCompanyById(companyid);
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
        let updatecompany :Company = await this.findCompanyById(companyid);
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
        let updatecompany :Company = await this.findCompanyById(companyid);
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

    async removeBillFromCompany(
        companyid: string,
        bill: string,
        ) {
        let updatecompany :Company = await this.findCompanyById(companyid);
        let theBill = await this.billService.getBillById(bill);
        if (theBill && updatecompany) {
            for ( let i = 0; i < updatecompany.bills.length; i++) {
                if ( updatecompany.bills[i] === theBill.id) {
                    updatecompany.bills.splice(i, 1);
                }
             }            
             updatecompany.save();
        }
        return updatecompany;
    }
    async deleteCompany(companyid: string) {
        await this.companyModel.findByIdAndDelete(companyid);
    }

    private async findCompanyById (id: string): Promise<Company> {
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
    private async findCompanyByName (name: string): Promise<Company> {
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
    private async findCompanyByCity (cityOrCountry: string): Promise<Company> {
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
   
    private async findCompanyByAdress(address: string): Promise<Company> {
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

    private async findCompanyByType (type: string): Promise<Company> {
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

    private async findCompanyemployee (employees: string): Promise<Company> {
        let company;
        try {

            company = await this.companyModel.find({ employees });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!company) {
            throw new NotFoundException('erreur!!');
        }

        return company;
    }

    private async findCompanyBybankaccount (bankAccounts: string): Promise<Company> {
        let company;
        try {

            company = await this.companyModel.find({ bankAccounts });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!company) {
            throw new NotFoundException('erreur!!');
        }

        return company;
    }

     private async findCompanyBybank (bank: string): Promise<Company> {
        let company;
        try {

            company = await this.companyModel.find({ bank });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!company) {
            throw new NotFoundException('erreur!!');
        }

        return company;
    }
    
    private async findCompanyBybill (bills: string): Promise<Company> {
        let company;
        try {

            company = await this.companyModel.find({ bills });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!company) {
            throw new NotFoundException('erreur!!');
        }

        return company;
    }
  
}