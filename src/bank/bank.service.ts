import { Injectable, NotFoundException } from '@nestjs/common';
import { Bank } from './bank.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { bankSchema } from './bank.model';
import { CompanyService } from '../company/company.service';
import { Company } from 'src/company/company.model';
import { BankAccountService } from '../bankaccount/bankaccount.service';
import { BankAccount } from '../bankaccount/bankaccount.model';

@Injectable()
export class BankService {


    private mybanks: Bank[] = [];
    constructor(
    @InjectModel('Bank') private readonly bankModel: Model<Bank>,
    @InjectModel('Company') private readonly companyModel: Model<Company>,
    @InjectModel('bankaccount') private readonly bankaccountModel: Model<BankAccount>,
    private readonly companyService:CompanyService,
    private readonly BankAccountService:BankAccountService,
    ){ }
    async insertbank (bankname: string, bankcity: string, bankaddress: string,  bankcompany: string, bankcomment: string) {
        this.addbank(bankname, bankcity, bankaddress, bankcompany, bankcomment)
    }
    async addbank(
        name: string,
        city: string,
        address: string,
        company: string,
        comment: string) {
        const newbank = new this.bankModel({
            name,
            city,
            address,
            company,
            comment,
        });
        const result = await newbank.save();
        return result.id as string;
    }
    async getAllbanks() {
        const banks = await this.bankModel.find().exec()
        return banks.map(bank => ({
            id: bank.id,
            name: bank.name,
            city: bank.city,
            address: bank.address,
            company: bank.company,
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
            city: bank.city,
            address: bank.address,
            company: bank.company,
            comment:bank.comment,
        };
    }

    async getBankBycity (bankcity: string) {
        const bank = await this.findBankBycity(bankcity);
        return {
            id: bank.id,
            name: bank.name,
            city: bank.city,
            address: bank.address,
            company: bank.company,
            comment:bank.comment,
        };
    }
    async getBankByaddress (bankaddress: string) {
        const bank = await this.findBankByaddress(bankaddress);
        return {
            id: bank.id,
            name: bank.name,
            city: bank.city,
            address: bank.address,
            company: bank.company,
            comment:bank.comment,
        };
    }

    async getBankBycompany (bankcompany: string) {
        const bank = await this.findBankBycompany (bankcompany);
        return {
            id: bank.id,
            name: bank.name,
            city: bank.city,
            address: bank.address,
            company: bank.company,
            comment:bank.comment,
        };
    }

   
    async getBankBycomment (bankcomment: string) {
        const bank = await this.findBankBycomment(bankcomment);
        return {
            id: bank.id,
            name: bank.name,
            city: bank.city,
            address: bank.address,
            company: bank.company,
          
            comment:bank.comment,
        };
    }

    async updatebank (
        bankid: string,
        name: string,
        city: string,
        address: string,
        company: string,
        bankAccount: string,
        comment: string) {
        const updatebank = await this.findBankById(bankid);
        if (name) {
            updatebank.name = name;
        }
        if (city) {
            updatebank.city = city;
        }
         if (address) {
            updatebank.address = address;
        }
        if (company) {
            updatebank.company = company;
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

    private async findBankById (id: string): Promise<Bank> {
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
     private async findBankBycity (city: string): Promise<Bank> {
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
    private async findBankByaddress (address: string): Promise<Bank> {
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
    private async findBankBycompany (company: string): Promise<Bank> {
        let bank;
        try {

            bank = await this.bankModel.find({ company });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!bank) {
            throw new NotFoundException('erreur!!');
        }
        return bank;
    }

     private async findbankAccountsBybank (bankAccountbank: string): Promise<Bank> {
        let bank;
        try {

            bank = await this.bankModel.find({ bankAccountbank });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!bank) {
            throw new NotFoundException('erreur!!');
        }
        return bank;
    }

    private async findBankBycomment (comment: string): Promise<Bank> {
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





