import { Injectable, NotFoundException } from '@nestjs/common';
import {  ChequeBook } from './chequeBook.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from '../company/company.model';
import { Bank } from '../bank/bank.model';
import { Employee } from '../employee/employee.model';
import { CompanyService } from '../company/company.service';
import { EmployeeService } from '../employee/employee.service';
import { BankService } from '../bank/bank.service';

@Injectable()
export class  ChequeBookService {


    private mychequeBooks: ChequeBook[] = [];
    constructor(
        @InjectModel('ChequeBook') private readonly chequeBookModel: Model<ChequeBook>,
        @InjectModel('Company') private readonly companyModel: Model<Company>,
        @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
        @InjectModel('Bank') private readonly bankModel: Model<Bank>,
        private readonly companyService:CompanyService,
        private readonly employeeService:EmployeeService,
        private readonly bankService:BankService) { }
    async insertchequeBook (number:string, delivredTo:string, company:string,bank:string) {
       return this.addchequeBook(number, delivredTo, company,bank)
    }
    async addchequeBook(
        number: string,
        delivredTo: string,
        company:string,
        bank:string
        ) {
        let newchequeBook = new this.chequeBookModel({
        });
        if(number)
        {
            newchequeBook.number=number;
        }
        if (company) {
            var theCompany = await this.companyService.getCompanyById(company);
            newchequeBook.company = theCompany.id ;
        }
        if (bank) {
            var thebank = await this.bankService.getBankById(bank);
            newchequeBook.bank = thebank.id ;
        }
        if (delivredTo) {
            var thedelivredTo = await this.employeeService.getEmployeeById(delivredTo);
            newchequeBook.delivredTo = thedelivredTo.id ;
        }
        const result = await newchequeBook.save();
        return result as ChequeBook;
    }
    async getchequeBooks() {
        const chequeBooks = await this.chequeBookModel.find().exec()
        return chequeBooks.map(chequeBook => ({
            id: chequeBook.id,
            number: chequeBook.number,
            delivredTo: chequeBook.delivredTo,
        }));
    }

    async getCHEQUEBOOK(chequeBookid: string) {
        const chequeBook = await this.findchequeBook(chequeBookid);
        return {
            id: chequeBook.id,
            number: chequeBook.number,
            delivredTo: chequeBook.delivredTo,
        };
    }

    async getthechequeBook(chequeBooknumber: string) {
        return await this.findnumber(chequeBooknumber);

    }
    async getthechequeBOOK (chequeBookdelivredTo: string) {
        const chequeBook = await this.findnumberOfCheque(chequeBookdelivredTo);
        return {
            id: chequeBook.id,
            number: chequeBook.number,
            delivredTo: chequeBook.delivredTo,
        };
    }
    async gettheChequeBook(chequeBookcomment: string) {
        const chequeBook = await this.findcomment(chequeBookcomment);
        return {
            id: chequeBook.id,
            number: chequeBook.number,
            delivredTo: chequeBook.delivredTo,
        };
    }

    async updatechequeBook(
        id: string,
        number: string,
        company: string,
        bank: string,
        delivredTo:string
        ) {
        const updatechequeBook = await this.findchequeBook(id);
        if (number) {
            updatechequeBook.number = number;
        }
        if (company) {
            var theCompany = await this.companyService.getCompanyById(company);
            updatechequeBook.company = theCompany.id ;
        }
        if (bank) {
            var thebank = await this.bankService.getBankById(bank);
            updatechequeBook.bank = thebank.id ;
        }
        if (delivredTo) {
            var thedelivredTo = await this.employeeService.getEmployeeById(delivredTo);
            updatechequeBook.delivredTo = thedelivredTo.id ;
        }
    
        const result = await updatechequeBook.save();
        return result;
    }

    async deletechequeBook(chequeBookid: string) {
        await this.chequeBookModel.findByIdAndDelete(chequeBookid);

    }

    private async findchequeBook (id: string): Promise<ChequeBook> {
        let chequeBook;
        try {
            chequeBook = await this.chequeBookModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!chequeBook) {
            throw new NotFoundException('erreur!!');
        }

        return chequeBook;
    }
    private async findnumber (number: string): Promise<ChequeBook> {
        let chequeBook;
        try {

            chequeBook = await this.chequeBookModel.find({ number:number });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!chequeBook) {
            throw new NotFoundException('erreur!!');
        }

        return chequeBook;
    }
    private async findnumberOfCheque (number: string): Promise<ChequeBook> {
        let chequeBook;
        try {

            chequeBook = await this.chequeBookModel.find({ number });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!chequeBook) {
            throw new NotFoundException('erreur!!');
        }

        return chequeBook;
    }
    private async findcomment(comment: string): Promise<ChequeBook> {
        let chequeBook;
        try {

            chequeBook = await this.chequeBookModel.find({ comment });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!chequeBook) {
            throw new NotFoundException('erreur!!');
        }
        return chequeBook;
    }
}





