import { Injectable, NotFoundException } from '@nestjs/common';
import { Cheque } from './cheque.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChequeService {


    private mycheques: Cheque[] = [];
    constructor(@InjectModel('Cheque') private readonly chequeModel: Model<Cheque>) { }
    async insertcheque (chequenumber: string, chequebillNumber: string, chequeamount: string, chequedueDate: string, chequecreationDate:string, chequeplaceOfCreation:string, chequecomment: string) {
        this.addcheque(chequenumber, chequebillNumber, chequeamount, chequedueDate, chequecreationDate, chequeplaceOfCreation, chequecomment)
    }
    async addcheque(
        number: string,
        billNumber: string,
        amount: string,
        dueDate: string,
        creationDate: string,
        placeOfCreation: string,
        comment: string) {
        const newcheque = new this.chequeModel({
            number,
            billNumber,
            amount,
            dueDate,
            creationDate,
            placeOfCreation,
            comment,
        });
        const result = await newcheque.save();
        return result.id as string;
    }
    async getcheques() {
        const cheques = await this.chequeModel.find().exec()
        return cheques.map(cheque => ({
            id: cheque.id,
            number: cheque.number,
            billNumber: cheque.billNumber,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            comment:cheque.comment,
        }));
    }

    async getCHEQUE(chequeid: string) {
        const cheque = await this.findcheque(chequeid);
        return {
            id: cheque.id,
            number: cheque.number,
            billNumber: cheque.billNumber,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            comment:cheque.comment,
        };
    }

    async getthecheque(chequeNumber: string) {
        const cheque = await this.findnumber(chequeNumber);
        return {
            id: cheque.id,
            number: cheque.number,
            billNumber: cheque.billNumber,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            comment:cheque.comment,
        };
    }

    async gettheCHEQUE(chequebillNumber: string) {
        const cheque = await this.findbillNumber(chequebillNumber);
        return {
            id: cheque.id,
            number: cheque.number,
            billNumber: cheque.billNumber,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            comment:cheque.comment,
        };
    }
    async getTHECHEQUE(chequeamount: string) {
        const cheque = await this.findamount(chequeamount);
        return {
            id: cheque.id,
            number: cheque.number,
            billNumber: cheque.billNumber,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            comment:cheque.comment,
        };
    }

    async getThecheque(chequedueDate: string) {
        const cheque = await this.finddueDate(chequedueDate);
        return {
            id: cheque.id,
            number: cheque.number,
            billNumber: cheque.billNumber,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            comment:cheque.comment,
        };
    }
    async getTheCheque(chequecreationDate: string) {
        const cheque = await this.findcreationDate(chequecreationDate);
        return {
            id: cheque.id,
            number: cheque.number,
            billNumber: cheque.billNumber,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            comment:cheque.comment,
        };
    }
    async getTHeCHeque(chequeplaceOfCreation: string) {
        const cheque = await this.findplaceOfCreation(chequeplaceOfCreation);
        return {
            id: cheque.id,
            number: cheque.number,
            billNumber: cheque.billNumber,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            comment:cheque.comment,
        };
    }
    async getTHECHEque(chequecomment: string) {
        const cheque = await this.findcomment(chequecomment);
        return {
            id: cheque.id,
            number: cheque.number,
            billNumber: cheque.billNumber,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            comment:cheque.comment,
        };
    }

    async updatecheque(
        chequeid: string,
        number: string,
        billNumber: string,
        amount: string,
        dueDate: string,
        creationDate: string,
        placeOfCreation: string,
        comment: string) {
        const updatecheque = await this.findcheque(chequeid);
        if (number) {
            updatecheque.number = number;
        }
        if (billNumber) {
            updatecheque.billNumber = billNumber;
        }
         if (amount) {
            updatecheque.amount = amount;
        }
        if (dueDate) {
            updatecheque.dueDate = dueDate;
        }
        if (creationDate) {
            updatecheque.creationDate = creationDate;
        }
        if (placeOfCreation) {
            updatecheque.placeOfCreation = placeOfCreation;
        }
        if (comment) {
            updatecheque.comment = comment;
        }
    
        const result = await updatecheque.save();
        return result;
    }

    async deletecheque(chequeid: string) {
        await this.chequeModel.findByIdAndDelete(chequeid);

    }

    private async findcheque (id: string): Promise<Cheque> {
        let cheque;
        try {
            cheque = await this.chequeModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }

        return cheque;
    }
    private async findnumber (number: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.find({ number });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }

        return cheque;
    }
     private async findbillNumber (billNumber: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.find({ billNumber });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }

        return cheque;
    }
    private async findamount (amount: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.find({ amount });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }

        return cheque;
    }
    private async finddueDate (dueDate: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.find({ dueDate });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }

        return cheque;
    }
    private async findcreationDate (creationDate: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.find({ creationDate });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }

        return cheque;
    }
    private async findplaceOfCreation (placeOfCreation: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.find({ placeOfCreation });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }

        return cheque;
    }
    private async findcomment (comment: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.find({ comment });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }
        return cheque;
    }
}





