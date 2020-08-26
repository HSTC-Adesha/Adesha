import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BankAccount } from './bankaccount.model';
import { ChequeService } from '../cheque/cheque.service';
@Injectable()
export class BankAccountService {

    constructor(
    @InjectModel('BankAccount') private readonly bankAccountModel: Model<BankAccount>,
    private readonly chequeService:ChequeService,
    ) { }
    async insertbankAccount (number: string, bank: string, company: string, employee: string) {
        this.addbankAccount(number, bank, company, employee)
    }
    async addbankAccount(
        number: string,
        bank: string,
        company: string,
        employee: string,
        ) {
        const newbankAccount = new this.bankAccountModel({
            number,
            bank,
            company,
            employee,
        });
        const result = await newbankAccount.save();
        return result;
    }
    async getAllBankAccounts() {
        return await this.bankAccountModel.find().exec()
    }

    async getBankAccountById(bankAccountid: string) {
        return await this.findbankAccountById(bankAccountid);
    }

    async getBankAccountByNumber(bankAccountnumber: string) {
        return await this.findbankAccountByNumber(bankAccountnumber);
    }
    async getBankAccountByBank(bankAccountbank: string) {
        return await this.findbankAccountByBank(bankAccountbank);
    }
    async getBankAccountBycompany(bankAccountcompany: string) {
        return await this.findbankAccountBycompany(bankAccountcompany);
    }
    async getBankAccountByemployee(bankAccountemployee: string) {
        return await this.findbankAccountByemployee(bankAccountemployee);
    }
    async updatebankAccount(
        bankAccountid: string,
        number:string,
        bank:string,
        company: string,
        employee: string
        ) {
        const updatebankAccount = await this.findbankAccountById(bankAccountid);
        if (number) {
            updatebankAccount.number= number;
            return await updatebankAccount.save();
            
        }
        if (bank) {
            updatebankAccount.bank= bank;
            return await updatebankAccount.save();
            
        }
        if (company) {
            updatebankAccount.company= company;
            return await updatebankAccount.save();
            
        }
        if (employee) {
            updatebankAccount.employee= employee;
            return await updatebankAccount.save();
            
        }
        return updatebankAccount;
    }

    async addchequeTobankaccount(
        bankAccountid: string,
        cheque: string,
        ) {
        let updatebankAccount :BankAccount = await this.getBankAccountById(bankAccountid);
        let theCheque  = await this.chequeService.getChequeById(cheque);
        if (theCheque && updatebankAccount) {
            updatebankAccount.cheques.push(theCheque.id) ;
            updatebankAccount.save();
            
        }
        return updatebankAccount;
    }
   

    async removechequeFrombankaccount(
        bankAccountid: string,
        cheque: string,
        ) {
        let updatebankAccount :BankAccount = await this.getBankAccountById(bankAccountid);
        let theCheque = await this.chequeService.getChequeById(cheque);
        if (theCheque && updatebankAccount) {
            for ( let i = 0; i < updatebankAccount.cheques.length; i++) {
                if ( updatebankAccount.cheques[i] === theCheque.id) {
                    updatebankAccount.cheques.splice(i, 1);
                }
             }
             updatebankAccount.save();
        }
        return updatebankAccount;
    }

    async deletebankAccount(bankAccountid: string) {
        await this.bankAccountModel.findByIdAndDelete(bankAccountid);

    }

    private async findbankAccountById (id: string): Promise<BankAccount> {
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
    private async findbankAccountByNumber (number: string): Promise<BankAccount> {
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


      private async findbankAccountByBank (bank: string): Promise<BankAccount> {
        let bankAccount;
        try {

            bankAccount = await this.bankAccountModel.find({ number:bank });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!bankAccount) {
            throw new NotFoundException('erreur!!');
        }

        return bankAccount;
    }

       private async findbankAccountBycompany (company: string): Promise<BankAccount> {
        let bankAccount;
        try {

            bankAccount = await this.bankAccountModel.find({ company });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!bankAccount) {
            throw new NotFoundException('erreur!!');
        }

        return bankAccount;
    }
      private async findbankAccountByemployee (employee: string): Promise<BankAccount> {
        let bankAccount;
        try {

            bankAccount = await this.bankAccountModel.find({ employee });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!bankAccount) {
            throw new NotFoundException('erreur!!');
        }

        return bankAccount;
    }
}





