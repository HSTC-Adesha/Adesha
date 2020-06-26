import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BankAccount } from './bankaccount.model';

@Injectable()
export class BankAccountService {


    private mybankAccounts: BankAccount[] = [];
    constructor(@InjectModel('BankAccount') private readonly bankAccountModel: Model<BankAccount>) { }
    async insertbankAccount (number: string) {
        this.addbankAccount(number)
    }
    async addbankAccount(
        number: string,
        ) {
        const newbankAccount = new this.bankAccountModel({
            number,
        });
        const result = await newbankAccount.save();
        return result as BankAccount;
    }
    async getbankAccounts() {
        return await this.bankAccountModel.find().exec()
    }

    async getBankAccountById(bankAccountid: string) {
        return await this.findbankAccount(bankAccountid);
    }

    async getthebankAccountByNumber(bankAccountnumber: string) {
        return await this.findBnumber(bankAccountnumber);
    }
    async updatebankAccount(
        bankAccountid: string,
        number:string
        ) {
        const updatebankAccount = await this.findbankAccount(bankAccountid);
        if (number) {
            updatebankAccount.number= number;
            return await updatebankAccount.save();
        }
        return updatebankAccount;
    }

    async deletebankAccount(bankAccountid: string) {
        await this.bankAccountModel.findByIdAndDelete(bankAccountid);

    }

    private async findbankAccount (id: string): Promise<BankAccount> {
        let bankAccount;
        try {
            bankAccount = await this.bankAccountModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!bankAccount) {
            throw new NotFoundException('erreur!!');
        }

        return bankAccount;
    }
    private async findBnumber (number: string): Promise<BankAccount> {
        let bankAccount;
        try {

            bankAccount = await this.bankAccountModel.find({ number:number });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!bankAccount) {
            throw new NotFoundException('erreur!!');
        }

        return bankAccount;
    }

}





