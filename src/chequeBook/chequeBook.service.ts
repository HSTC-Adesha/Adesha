import { Injectable, NotFoundException, forwardRef, Inject } from '@nestjs/common';
import { ChequeBook } from './chequeBook.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChequeService } from '../cheque/cheque.service';

@Injectable()
export class ChequeBookService {
    constructor(
        @InjectModel('ChequeBook') private readonly chequeBookModel: Model<ChequeBook>,
        @Inject(forwardRef(() => ChequeService))
        private readonly chequeService: ChequeService,
    ) { }
    async insertchequeBook(number: string, bank: string,  company: string) {
        return this.addchequeBook(number, bank,company)
    }
    async addchequeBook(
        number: string,
        bank: string,
        company: string

    ) {
        const newchequeBook = new this.chequeBookModel({
            number,
            bank,
            company,
        });
        const result = await newchequeBook.save();
        return result;
    }
    async getAllchequeBooks() {
       return await this.chequeBookModel.find().populate("bank").populate('company').exec();
    }

    async getchequeBooksById(chequeBookid: string) {
        const chequeBook = await this.findchequeBooksById(chequeBookid);
        return {
            id: chequeBook.id,
            number: chequeBook.number,
            bank: chequeBook.bank,
            company: chequeBook.company,
        };
    }

    async getchequeBooksByNumber(chequeBooknumber: string) {
        return await this.findchequeBooksByNumber(chequeBooknumber);

    }
    async getchequeBooksByCheque(chequeBookcheques: string) {
        return await this.findchequeBooksByCheque(chequeBookcheques);

    }
    async getchequeBooksByBank(chequeBookbank: string) {
        return await this.findchequeBooksByBank(chequeBookbank);

    }
    async getchequeBooksByReceiver(chequeBookdelivredTo: string) {
        return await this.getchequeBooksByReceiver(chequeBookdelivredTo);

    }
    async getchequeBooksByCompany(chequeBookcompany: string) {
        return await this.findchequeBooksByCompany(chequeBookcompany);
       
    }

    async updatechequeBook(
        chequeBookid: string,
        number: string,
        bank: string,
        delivredTo: string,
        company: string

    ) {
        const updatechequeBook = await this.findchequeBooksById(chequeBookid);
        if (number) {
            updatechequeBook.number = number;
        }

        if (bank) {
            updatechequeBook.bank = bank;
        }
 
        if (company) {
            updatechequeBook.company = company;
        }



        const result = await updatechequeBook.save();
        return result;
    }

    async deletechequeBook(chequeBookid: string) {
        await this.chequeBookModel.findByIdAndDelete(chequeBookid);

    }

    private async findchequeBooksById(id: string): Promise<ChequeBook> {
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
    private async findchequeBooksByNumber(number: string): Promise<ChequeBook> {
        let chequeBook;
        try {

            chequeBook = await this.chequeBookModel.find({ number: number });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!chequeBook) {
            throw new NotFoundException('erreur!!');
        }

        return chequeBook;
    }
    private async findchequeBooksByCheque(cheque: string): Promise<ChequeBook> {
        let chequeBook;
        try {

            chequeBook = await this.chequeBookModel.find({ cheque });
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





