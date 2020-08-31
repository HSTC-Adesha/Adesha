import { Injectable, NotFoundException} from '@nestjs/common';
import { Bank } from './bank.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class BankService {
    constructor(
    @InjectModel('Bank') private readonly bankModel: Model<Bank>,
    ){ }
    async insertbank (bankname: string,bankcomment: string) {
       return this.addbank(bankname, bankcomment)
    }
    async addbank(
        name: string,
         comment: string) {
        const newbank = new this.bankModel({
            name,
            comment,
        });
        return await newbank.save();
    }
    async getAllbanks() {
        const banks = await this.bankModel.find().exec()
        return banks.map(bank => ({
            id: bank.id,
            name: bank.name,
            comment:bank.comment,
        }));
    }

    async getBankById(bankid: string) {
        return await this.findBankById(bankid);
    }

    async getBankByname (bankname: string) {
        const bank = await this.findBankByname(bankname);
        return {
            id: bank.id,
            name: bank.name,
            comment:bank.comment,
        };
    }


    async updatebank (
        bankid: string,
        name: string,
  
        comment: string) {
        const updatebank = await this.findBankById(bankid);
        if (name) {
            updatebank.name = name;
        }
        if (comment) {
            updatebank.comment = comment;
        }
    
        const result = await updatebank.save();
        return result;
    }

   
    async deletebank(bankid: string) {
        await this.bankModel.findByIdAndDelete(bankid);

    }

    private async findBankById (id: string) {
        let bank;
        try {
            bank = await this.bankModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException(error);
        }
        console.log("bank",bank)

        if (!bank) {
            throw new NotFoundException(bank);
        }
        return bank;
    }
    private async findBankByname (name: string): Promise<Bank> {
        let bank;
        try {

            bank = await this.bankModel.find({ name });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!bank) {
            throw new NotFoundException('erreur!!');
        }

        return bank;
    }
}





