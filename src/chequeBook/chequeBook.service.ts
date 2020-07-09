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
import { chequeSchema, Cheque } from '../cheque/cheque.model';
import { ChequeService } from '../cheque/cheque.service';

@Injectable()
export class  ChequeBookService {


    private mychequeBooks: ChequeBook[] = [];
    constructor(
        @InjectModel('ChequeBook') private readonly chequeBookModel: Model<ChequeBook>,
        @InjectModel('Company') private readonly companyModel: Model<Company>,
        @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
        @InjectModel('Bank') private readonly bankModel: Model<Bank>,
        @InjectModel('Cheque') private readonly chequeModel: Model<Cheque>,
        private readonly companyService:CompanyService,
        private readonly employeeService:EmployeeService,
        private readonly bankService:BankService,
        private readonly ChequeService:ChequeService,
        ) { }
    async insertchequeBook (number:string, bank:string, delivredTo:string, company:string) {
       return this.addchequeBook(number, bank, delivredTo, company)
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
    async getAllchequeBooks() {
        const chequeBooks = await this.chequeBookModel.find().exec()
        return chequeBooks.map(chequeBook => ({
            id: chequeBook.id,
            number: chequeBook.number,
            delivredTo: chequeBook.delivredTo,
        }));
    }

    async getchequeBooksById(chequeBookid: string) {
        const chequeBook = await this.findchequeBooksById(chequeBookid);
        return {
            id: chequeBook.id,
            number: chequeBook.number,
            bank:chequeBook.bank,
            delivredTo: chequeBook.delivredTo,
            company:chequeBook.company,
        };
    }

    async getchequeBooksByNumber(chequeBooknumber: string) {
        return await this.findchequeBooksByNumber(chequeBooknumber);

    }
    async getchequeBooksByBank(chequeBookbank: string) {
        return await this.findchequeBooksByBank(chequeBookbank);

    }
    async getchequeBooksByReceiver(chequeBookdelivredTo: string) {
        return await this.getchequeBooksByReceiver(chequeBookdelivredTo);

    }
    async getchequeBooksByCompany(chequeBookcompany: string) {
        const chequeBook = await this.findchequeBooksByCompany(chequeBookcompany);
        return {
            id: chequeBook.id,
            number: chequeBook.number,
            delivredTo: chequeBook.delivredTo,
        }
    }

    async updatechequeBook(
        chequeBookid: string,
        number: string,
        company: string,
        bank: string,
        delivredTo:string ) {
        const updatechequeBook = await this.getchequeBooksById(chequeBookid);
        if (number) {
            updatechequeBook.number = number;
        }
        if (bank) {
            var thebank = await this.bankService.getBankById(bank);
            updatechequeBook.bank = thebank.id ;
        }
        if (delivredTo) {
            var thedelivredTo = await this.employeeService.getEmployeeById(delivredTo);
            updatechequeBook.delivredTo = thedelivredTo.id ;
        }
        if (company) {
            var theCompany = await this.companyService.getCompanyById(company);
            updatechequeBook.company = theCompany.id ;
        }
      
       
        const result = await updatechequeBook.save();
        return result;
    }

    async addChequeTochequeBook(
        chequeBookid : string,
        cheque: string,
        ) {
        let updatechequeBook:ChequeBook = await this.getchequeBooksById(chequeBookid);
        let theCheque:Cheque = await this.ChequeService.getChequeById(cheque);
        if (theCheque && updatechequeBook) {
            updatechequeBook.cheques.push(theCheque.id) ;
            updatechequeBook.save();
        }
        return updatechequeBook;
    }
    async removeChequeFromchequeBook(
        chequeBookid : string,
        cheque: string,
        ) {
        let updatechequeBook :Company = await this.getchequeBooksById(chequeBookid);
        let theCheque:Bank = await this.ChequeService.getChequeById(cheque);
        if (theCheque && updatechequeBook) {
            for ( let i = 0; i < updatechequeBook.cheques.length; i++) {
                if ( updatechequeBook.cheques[i] === theBank.id) {
                    updatechequeBook.cheques.splice(i, 1);
                }
             }
             updatechequeBook.save();
        }
        return updatechequeBook;
    }

    async deletechequeBook(chequeBookid: string) {
        await this.chequeBookModel.findByIdAndDelete(chequeBookid);

    }

    private async findchequeBooksById (id: string): Promise<ChequeBook> {
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
    private async findchequeBooksByNumber (number: string): Promise<ChequeBook> {
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
    
     private async findchequeBooksByBank(bank: string): Promise<ChequeBook> {
        let chequeBook;
        try {

            chequeBook = await this.chequeBookModel.find({ bank });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!chequeBook) {
            throw new NotFoundException('erreur!!');
        }
        return chequeBook;
    }
    private async findchequeBooksByCompany(company: string): Promise<ChequeBook> {
        let chequeBook;
        try {

            chequeBook = await this.chequeBookModel.find({ company });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!chequeBook) {
            throw new NotFoundException('erreur!!');
        }
        return chequeBook;
    }
}





