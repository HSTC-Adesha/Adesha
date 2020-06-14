import { Injectable, NotFoundException } from '@nestjs/common';
import { Bill } from './bill.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BillService {


    private mybills: Bill[] = [];
    constructor(@InjectModel('Bill') private readonly billModel: Model<Bill>) { }
    async insertbill (billnumber: string, billcomment: string) {
        this.addbill(billnumber, billcomment)
    }
    async addbill(
        number: string,
        comment: string) {
        const newbill = new this.billModel({
            number,
            comment,
        });
        const result = await newbill.save();
        return result.id as string;
    }
    async getbills() {
        const bills = await this.billModel.find().exec()
        return bills.map(bill => ({
            id: bill.id,
            number: bill.number,
            comment:bill.comment,
        }));
    }

    async getBILL(billid: string) {
        const bill = await this.findbill(billid);
        return {
            id: bill.id,
            number: bill.number,
            comment:bill.comment,
        };
    }

    async getthebill(billnumber: string) {
        const bill = await this.findnumber(billnumber);
        return {
            id: bill.id,
            number: bill.number,
            comment:bill.comment,
        };
    }
    async gettheBill(billcomment: string) {
        const bill = await this.findcomment(billcomment);
        return {
            id: bill.id,
            number: bill.number,
            comment:bill.comment,
        };
    }

    async updatebill(
        billid: string,
        number: string,
        comment: string) {
        const updatebill = await this.findbill(billid);
        if (number) {
            updatebill.number = number;
        }
        if (comment) {
            updatebill.comment = comment;
        }
    
        const result = await updatebill.save();
        return result;
    }

    async deletebill(billid: string) {
        await this.billModel.findByIdAndDelete(billid);

    }

    private async findbill(id: string): Promise<Bill> {
        let bill;
        try {
            bill = await this.billModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!bill) {
            throw new NotFoundException('erreur!!');
        }

        return bill;
    }
    private async findnumber (number: string): Promise<Bill> {
        let bill;
        try {

            bill = await this.billModel.find({ number });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!bill) {
            throw new NotFoundException('erreur!!');
        }

        return bill;
    }
    private async findcomment(comment: string): Promise<Bill> {
        let bill;
        try {

            bill = await this.billModel.find({ comment });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!bill) {
            throw new NotFoundException('erreur!!');
        }
        return bill;
    }
}





