import { Injectable, NotFoundException } from '@nestjs/common';
import {  ChequeBook } from './chequeBook.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class  ChequeBookService {


    private mychequeBooks: ChequeBook[] = [];
    constructor(@InjectModel('ChequeBook') private readonly chequeBookModel: Model<ChequeBook>) { }
    async insertchequeBook (chequeBooknumber: string, chequeBooknumberOfCheques: string, chequeBookcomment: string) {
        this.addchequeBook(chequeBooknumber, chequeBooknumberOfCheques, chequeBookcomment)
    }
    async addchequeBook(
        number: string,
        numberOfCheques: string,
        comment: string) {
        const newchequeBook = new this.chequeBookModel({
            number,
            numberOfCheques,
            comment,
        });
        const result = await newchequeBook.save();
        return result.id as string;
    }
    async getchequeBooks() {
        const chequeBooks = await this.chequeBookModel.find().exec()
        return chequeBooks.map(chequeBook => ({
            id: chequeBook.id,
            number: chequeBook.number,
            numberOfCheques: chequeBook.numberOfCheques,
            comment:chequeBook.comment,
        }));
    }

    async getCHEQUEBOOK(chequeBookid: string) {
        const chequeBook = await this.findchequeBook(chequeBookid);
        return {
            id: chequeBook.id,
            number: chequeBook.number,
            numberOfCheques: chequeBook.numberOfCheques,
            comment:chequeBook.comment,
        };
    }

    async getthechequeBook(chequeBooknumber: string) {
        const chequeBook = await this.findnumber(chequeBooknumber);
        return {
            id: chequeBook.id,
            number: chequeBook.number,
            numberOfCheques: chequeBook.numberOfCheques,
            comment:chequeBook.comment,
        };
    }
    async getthechequeBOOK (chequeBooknumberOfCheques: string) {
        const chequeBook = await this.findnumberOfCheque(chequeBooknumberOfCheques);
        return {
            id: chequeBook.id,
            number: chequeBook.number,
            numberOfCheques: chequeBook.numberOfCheques,
            comment:chequeBook.comment,
        };
    }
    async gettheChequeBook(chequeBookcomment: string) {
        const chequeBook = await this.findcomment(chequeBookcomment);
        return {
            id: chequeBook.id,
            number: chequeBook.number,
            numberOfCheques: chequeBook.numberOfCheques,
            comment:chequeBook.comment,
        };
    }

    async updatechequeBook(
        chequeBookid: string,
        number: string,
        numberOfCheques: string,
        comment: string) {
        const updatechequeBook = await this.findchequeBook(chequeBookid);
        if (number) {
            updatechequeBook.number = number;
        }
        if (numberOfCheques) {
            updatechequeBook.numberOfCheques = numberOfCheques;
        }
        if (comment) {
            updatechequeBook.comment = comment;
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

            chequeBook = await this.chequeBookModel.find({ number });
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





