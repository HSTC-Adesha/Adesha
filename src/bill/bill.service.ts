import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { Bill } from './bill.model';
import { chequeSchema, Cheque } from '../cheque/cheque.model';
import { ChequeService } from '../cheque/cheque.service';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/company.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BillService {


    private mybills: Bill[] = [];
    constructor(
    @InjectModel('Bill') private readonly billModel: Model<Bill>,
    @InjectModel('cheque') private readonly chequeModel: Model<Cheque>,
    @InjectModel('Company') private readonly companyModel: Model<Company>,
    @Inject(forwardRef(() => ChequeService ))
    private readonly ChequeService:ChequeService,
    @Inject(forwardRef(() => ChequeService ))
    private readonly companyService:CompanyService,
    ) { }
    async insertbill (billnumber: string, billcheque: string, billcompany: string, billcomment: string ) {
        this.addbill(billnumber, billcheque, billcompany,  billcomment)
    }
    async addbill(
        number: string,
        cheque: string,
        company : string,
        comment: string
       ) {
        const newbill = new this.billModel({
            number,
            cheque,
            company,
            comment,
        });
        const result = await newbill.save();
        return result.id as string;
    }
    async getAllbills() {
        const bills = await this.billModel.find().exec()
        return bills.map(bill => ({
            id: bill.id,
            number: bill.number,
            cheque: bill.cheque,
            company: bill.company,
            comment:bill.comment,
        }));
    }

    async getBillById(billid: string) {
        const bill = await this.findBillById(billid);
        return {
            id: bill.id,
            number: bill.number,
            cheque: bill.cheque,
            company: bill.company,
            comment:bill.comment,
        };
    }

    async getBillByNumber(billnumber: string) {
        const bill = await this.findBillByNumber(billnumber);
        return {
            id: bill.id,
            number: bill.number,
            cheque: bill.cheque,
            company: bill.company,
            comment:bill.comment,
        };
    }
    async getBillByCheque(billcheque: string) {
        const bill = await this.findBillByCheque (billcheque);
        return {
            id: bill.id,
            number: bill.number,
            cheque: bill.cheque,
            company: bill.company,
            comment:bill.comment,
        };
    }
    async getBillByCompany(billcompany: string) {
        const bill = await this.findBillByCompany (billcompany);
        return {
            id: bill.id,
            number: bill.number,
            cheque: bill.cheque,
            company: bill.company,
            comment:bill.comment,
    };
}
    async getBillByComment(billcomment: string) {
        const bill = await this.findBillByComment (billcomment);
        return {
            id: bill.id,
            number: bill.number,
            cheque: bill.cheque,
            company: bill.company,
            comment:bill.comment,
    };
}

    async updatebill(
        billid: string,
        number: string,
        cheque: string,
        company: string,
        comment: string) {
        const updatebill = await this.findBillById(billid);
        if (number) {
            updatebill.number = number;
        }
        if (cheque) {
            updatebill.cheque = cheque;
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

    private async findBillByCheque (cheque: string): Promise<Bill> {
        let bill;
        try {

            bill = await this.billModel.find({ cheque });
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





