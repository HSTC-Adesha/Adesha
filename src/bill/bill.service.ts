import { Injectable, NotFoundException } from '@nestjs/common';
import { Bill } from './bill.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BillService {
    constructor(
    @InjectModel('Bill') private readonly billModel: Model<Bill>,
    ) { }
    async insertbill (billnumber: string, billcheque: string, billcompany: string, billcomment: string ) {
       return this.addbill(billnumber, billcheque, billcompany,  billcomment)
    }
    async addbill(
        number: string,
        ammount: string,
        company : string,
        comment: string
       ) {
        const newbill = new this.billModel({
            number,
            ammount,
            company,
            comment,
        });
        const result = await newbill.save();
        return result;
    }
    async getAllbills() {
        return await this.billModel.find().populate('company').exec();
    }

    async getBillById(billid: string) {
        return await this.findBillById(billid);
    }

    async getBillByNumber(billnumber: string) {
        const bill = await this.findBillByNumber(billnumber);
        return {
            id: bill.id,
            number: bill.number,
            ammount: bill.ammount,
            company: bill.company,
            comment:bill.comment,
        };
    }
    async getBillByammount(billcheque: string) {
        return await this.findBillByammount (billcheque);
      
    }
    async getBillByCompany(billcompany: string) {
        return await this.findBillByCompany (billcompany);
    
}
    async getBillByComment(billcomment: string) {
        return await this.findBillByComment (billcomment);
      
}

    async updatebill(
        billid: string,
        number: string,
        ammount: string,
        company: string,
        comment: string) {
        const updatebill = await this.findBillById(billid);
        if (number) {
            updatebill.number = number;
        }
        if (ammount) {
            updatebill.ammount = ammount;
        }
        if (company) {
            updatebill.company = company;
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

    private async findBillById (id: string): Promise<Bill> {
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
    private async findBillByNumber (number: string): Promise<Bill> {
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

    private async findBillByammount (ammount: string): Promise<Bill> {
        let bill;
        try {

            bill = await this.billModel.find({ ammount });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!bill) {
            throw new NotFoundException('erreur!!');
        }

        return bill;
    } 

    private async findBillByCompany  (company: string): Promise<Bill> {
        let bill;
        try {

            bill = await this.billModel.find({ company });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!bill) {
            throw new NotFoundException('erreur!!');
        }
        return bill;
    }
    private async findBillByComment (comment: string): Promise<Bill> {
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





