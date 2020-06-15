import { Injectable, NotFoundException } from '@nestjs/common';
import { Bank } from './bank.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BankService {


    private mybanks: Bank[] = [];
    constructor(@InjectModel('Bank') private readonly bankModel: Model<Bank>) { }
    async insertbank (bankname: string, bankcity: string, bankaddress: string, bankcomment: string) {
        this.addbank(bankname, bankcity, bankaddress, bankcomment)
    }
    async addbank(
        name: string,
        city: string,
        address: string,
        comment: string) {
        const newbank = new this.bankModel({
            name,
            city,
            address,
            comment,
        });
        const result = await newbank.save();
        return result.id as string;
    }
    async getbanks() {
        const banks = await this.bankModel.find().exec()
        return banks.map(bank => ({
            id: bank.id,
            name: bank.name,
            city: bank.city,
            address: bank.address,
            comment:bank.comment,
        }));
    }

    async getBANK(bankid: string) {
        const bank = await this.findbank(bankid);
        return {
            id: bank.id,
            name: bank.name,
            city: bank.city,
            address: bank.address,
            comment:bank.comment,
        };
    }

    async getthebank(bankname: string) {
        const bank = await this.findname(bankname);
        return {
            id: bank.id,
            name: bank.name,
            city: bank.city,
            address: bank.address,
            comment:bank.comment,
        };
    }

    async gettheBANK(bankcity: string) {
        const bank = await this.findcity(bankcity);
        return {
            id: bank.id,
            name: bank.name,
            city: bank.city,
            address: bank.address,
            comment:bank.comment,
        };
    }
    async getTHEBANK(bankaddress: string) {
        const bank = await this.findaddress(bankaddress);
        return {
            id: bank.id,
            name: bank.name,
            city: bank.city,
            address: bank.address,
            comment:bank.comment,
        };
    }

    async getTheBANK(billcomment: string) {
        const bank = await this.findcomment(billcomment);
        return {
            id: bank.id,
            name: bank.name,
            city: bank.city,
            address: bank.address,
            comment:bank.comment,
        };
    }

    async updatebank(
        bankid: string,
        name: string,
        city: string,
        address: string,
        comment: string) {
        const updatebank = await this.findbank(bankid);
        if (name) {
            updatebank.name = name;
        }
        if (city) {
            updatebank.city = city;
        }
         if (address) {
            updatebank.address = address;
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

    private async findbank (id: string): Promise<Bank> {
        let bank;
        try {
            bank = await this.bankModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!bank) {
            throw new NotFoundException('erreur!!');
        }

        return bank;
    }
    private async findname (name: string): Promise<Bank> {
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
     private async findcity (city: string): Promise<Bank> {
        let bank;
        try {

            bank = await this.bankModel.find({ city });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!bank) {
            throw new NotFoundException('erreur!!');
        }

        return bank;
    }
    private async findaddress (address: string): Promise<Bank> {
        let bank;
        try {

            bank = await this.bankModel.find({ address });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!bank) {
            throw new NotFoundException('erreur!!');
        }

        return bank;
    }
    private async findcomment (comment: string): Promise<Bank> {
        let bank;
        try {

            bank = await this.bankModel.find({ comment });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!bank) {
            throw new NotFoundException('erreur!!');
        }
        return bank;
    }
}





