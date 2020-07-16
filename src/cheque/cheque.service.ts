import { Injectable, NotFoundException, forwardRef, Inject } from '@nestjs/common';
import { Cheque } from './cheque.model';
import { Company } from '../company/company.model';
import { Bank } from '../bank/bank.model';
import { ChequeBook, chequeBookSchema } from '../chequeBook/chequeBook.model';
import { BankAccount } from '../bankaccount/bankaccount.model';
import { Bill } from '../bill/bill.model';
import { Employee } from '../employee/employee.model';
import { CompanyService } from '../company/company.service';
import { BankService } from '../bank/bank.service';
import { ChequeBookService } from '../chequeBook/chequeBook.service';
import { BankAccountService } from '../bankaccount/bankaccount.service';
import { BillService } from '../bill/bill.service';
import { EmployeeService } from '../employee/employee.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChequeService {


    private mycheques: Cheque[] = [];
    constructor(
    @InjectModel('cheque') private readonly chequeModel: Model<Cheque>,
    @InjectModel('Bank') private readonly bankModel: Model<Bank>,
    @InjectModel('Company') private readonly companyModel: Model<Company>,
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
    @InjectModel('ChequeBook') private readonly chequeBookModel: Model<ChequeBook>,
    @InjectModel('bankaccount') private readonly bankAccountModel: Model<BankAccount>,
    @InjectModel('Bill') private readonly billModel: Model<Bill>,
    @Inject(forwardRef(() => BankService))
    private readonly bankService: BankService,
    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,
    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,
    @Inject(forwardRef(() => ChequeBookService))
    private readonly chequeBookService: ChequeBookService,
    @Inject(forwardRef(() => BankAccountService))
    private readonly BankAccountService:BankAccountService,
    @Inject(forwardRef(() => BillService))
    private readonly billService: BillService,
    ) { }
    async insertcheque (chequenumber: string, chequeamount: string, chequedueDate: string, chequecreationDate:string, chequeplaceOfCreation:string, 
        chequebank: string, chequecompany: string, chequedelivredTo: string, chequechequeBook: string, chequebankAccount: string, chequecomment: string) {
        this.addcheque(chequenumber, chequeamount, chequedueDate, chequecreationDate, chequeplaceOfCreation, chequebank, chequecompany, chequedelivredTo, chequechequeBook, chequebankAccount, chequecomment)
    }
    async addcheque(
        number: string,
        amount: string,
        dueDate: string,
        creationDate: string,
        placeOfCreation: string,
        bank: string,
        company: string,
        delivredTo: string,
        chequeBook: string,
        bankAccount: string,
        comment: string) {
        const newcheque = new this.chequeModel({
            number,
            amount,
            dueDate,
            creationDate,
            placeOfCreation,
            bank,
            company,
            delivredTo,
            chequeBook,
            bankAccount,
            comment,
        });
        const result = await newcheque.save();
        return result.id as string;
    }
    async getAllCheques() {
        const cheques = await this.chequeModel.find().exec()
        return cheques.map(cheque => ({
            id: cheque.id,
            number: cheque.number,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            bank: cheque.bank,
            company: cheque.company,
            delivredTo: cheque.delivredTo,
            chequeBook: cheque.chequeBook,
            bankAccount: cheque.bankAccount,
            comment:cheque.comment,
        }));
    }

    async getChequeById (chequeid: string) {
        const cheque = await this.findChequeById(chequeid);
        return {
            id: cheque.id,
            number: cheque.number,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            bank: cheque.bank,
            company: cheque.company,
            delivredTo: cheque.delivredTo,
            chequeBook: cheque.chequeBook,
            bankAccount: cheque.bankAccount,
            comment:cheque.comment,
        };
    }

    async getChequeByNumber(chequeNumber: string) {
        const cheque = await this.findChequeByNumber(chequeNumber);
        return {
            id: cheque.id,
            number: cheque.number,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            bank: cheque.bank,
            company: cheque.company,
            delivredTo: cheque.delivredTo,
            chequeBook: cheque.chequeBook,
            bankAccount: cheque.bankAccount,
            comment:cheque.comment,
        };
    }


    async getChequeByAmount(chequeamount: string) {
        const cheque = await this.findChequeByAmount(chequeamount);
        return {
            id: cheque.id,
            number: cheque.number,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            bank: cheque.bank,
            company: cheque.company,
            delivredTo: cheque.delivredTo,
            chequeBook: cheque.chequeBook,
            bankAccount: cheque.bankAccount,
            comment:cheque.comment,
        };
    }

    async getChequeByDueDate(chequedueDate: string) {
        const cheque = await this.findChequeByDueDate(chequedueDate);
        return {
            id: cheque.id,
            number: cheque.number,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            bank: cheque.bank,
            company: cheque.company,
            delivredTo: cheque.delivredTo,
            chequeBook: cheque.chequeBook,
            bankAccount: cheque.bankAccount,
            comment:cheque.comment,
        };
    }
    async getChequeByCreationDate(chequecreationDate: string) {
        const cheque = await this.findChequeByCreationDate(chequecreationDate);
        return {
            id: cheque.id,
            number: cheque.number,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            bank: cheque.bank,
            company: cheque.company,
            delivredTo: cheque.delivredTo,
            chequeBook: cheque.chequeBook,
            bankAccount: cheque.bankAccount,
            comment:cheque.comment,
        };
    }
    async getChequeByPlaceOfCreation(chequeplaceOfCreation: string) {
        const cheque = await this.findChequeByPlaceOfCreation(chequeplaceOfCreation);
        return {
            id: cheque.id,
            number: cheque.number,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            bank: cheque.bank,
            company: cheque.company,
            delivredTo: cheque.delivredTo,
            chequeBook: cheque.chequeBook,
            bankAccount: cheque.bankAccount,
            comment:cheque.comment,
        };
    }
    async getChequeBybank(chequebank: string) {
        const cheque = await this.findChequeBybank(chequebank);
        return {
            id: cheque.id,
            number: cheque.number,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            bank: cheque.bank,
            company: cheque.company,
            delivredTo: cheque.delivredTo,
            chequeBook: cheque.chequeBook,
            bankAccount: cheque.bankAccount,
            comment:cheque.comment,
        };
    }
    async getChequeBycompany(chequecompany: string) {
        const cheque = await this.findChequeBycompany(chequecompany);
        return {
            id: cheque.id,
            number: cheque.number,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            bank: cheque.bank,
            company: cheque.company,
            delivredTo: cheque.delivredTo,
            chequeBook: cheque.chequeBook,
            bankAccount: cheque.bankAccount,
            comment:cheque.comment,
        };
    }
    async getChequeByReceiver(chequedelivredTo: string) {
        const cheque = await this.findChequeByReceiver(chequedelivredTo);
        return {
            id: cheque.id,
            number: cheque.number,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            bank: cheque.bank,
            company: cheque.company,
            delivredTo: cheque.delivredTo,
            chequeBook: cheque.chequeBook,
            bankAccount: cheque.bankAccount,
            comment:cheque.comment,
        };
    }
    async getChequeBychequeBook(chequechequeBook: string) {
        const cheque = await this.findChequeBychequeBook(chequechequeBook);
        return {
            id: cheque.id,
            number: cheque.number,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            bank: cheque.bank,
            company: cheque.company,
            delivredTo: cheque.delivredTo,
            chequeBook: cheque.chequeBook,
            bankAccount: cheque.bankAccount,
            comment:cheque.comment,
        };
    }
    async getChequeBybankAccount(chequebankaccount: string) {
        const cheque = await this.findChequeBybankAccount(chequebankaccount);
        return {
            id: cheque.id,
            number: cheque.number,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            bank: cheque.bank,
            company: cheque.company,
            delivredTo: cheque.delivredTo,
            chequeBook: cheque.chequeBook,
            bankAccount: cheque.bankAccount,
            comment:cheque.comment,
        };
    }
   
    async getChequeByComment(chequecomment: string) {
        const cheque = await this.findChequeByComment(chequecomment);
        return {
            id: cheque.id,
            number: cheque.number,
            amount: cheque.amount,
            dueDate: cheque.dueDate,
            creationDate: cheque.creationDate,
            placeOfCreation: cheque.placeOfCreation,
            bank: cheque.bank,
            company: cheque.company,
            delivredTo: cheque.delivredTo,
            chequeBook: cheque.chequeBook,
            bankAccount: cheque.bankAccount,
            comment:cheque.comment,
        };
    }

    async updatecheque(
        chequeid: string,
        number: string,
        amount: string,
        dueDate: string,
        creationDate: string,
        placeOfCreation: string,
        bank: string,
        company: string,
        delivredTo: string,
        chequeBook: string,
        bankAccount: string, 
        comment: string) {
        const updateCheque = await this.findChequeById(chequeid);
        if (number) {
            updateCheque.number = number;
        }

         if (amount) {
            updateCheque.amount = amount;
        }
        if (dueDate) {
            updateCheque.dueDate = dueDate;
        }
        if (creationDate) {
            updateCheque.creationDate = creationDate;
        }
        if (placeOfCreation) {
            updateCheque.placeOfCreation = placeOfCreation;
        }
        if (bank) {
            updateCheque.bank = bank;
        }
        if (company) {
            updateCheque.company = company;
        }
        if (delivredTo) {
            updateCheque.delivredTo = delivredTo;
        }
        if (chequeBook) {
            updateCheque.chequeBook = chequeBook;
        }
        if (bankAccount) {
            updateCheque.bankAccount = bankAccount;
        }
        if (comment) {
            updateCheque.comment = comment;
        }
    
        const result = await updateCheque.save();
        return result;
    }
    async addBillToCheque(
        chequeid: string,
        bill: string,
        ) {
        let updateCheque :Cheque = await this.findChequeById(chequeid);
        let theBill  = await this.billService.getBillById(bill);
        if (theBill && updateCheque) {
            updateCheque.bills.push(theBill.id) ;
            theBill.cheque = updateCheque.id;
            updateCheque.save();
        
        }
        return updateCheque;
    }

    async removeBillFromcheque(
        chequeid: string,
        bill: string,
        ) {
            let updateCheque :Cheque = await this.findChequeById(chequeid);
            let theBill = await this.billService.getBillById(bill);
       
        if (theBill && updateCheque) {
            for ( let i = 0; i < updateCheque.bills.length; i++) {
                if ( updateCheque.bills[i] === theBill.id) {
                    updateCheque.bills.splice(i, 1);
                }
             }
             updateCheque.save();
        }
        return updateCheque;
    }
    async deletecheque(chequeid: string) {
        await this.chequeModel.findByIdAndDelete(chequeid);

    }

    private async findChequeById (id: string): Promise<Cheque> {
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
    private async findChequeByNumber (number: string): Promise<Cheque> {
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
     
    private async findChequeByAmount (amount: string): Promise<Cheque> {
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
    private async findChequeByDueDate (dueDate: string): Promise<Cheque> {
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
    private async findChequeByCreationDate (creationDate: string): Promise<Cheque> {
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
    private async findChequeByPlaceOfCreation (placeOfCreation: string): Promise<Cheque> {
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

    private async findChequeBycompany (company: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.find({ company });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }

        return cheque;
    }
    private async findChequeBybank (bank: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.find({ bank });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }

        return cheque;
    }

    private async findChequeByReceiver (delivredTo: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.find({ delivredTo });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }

        return cheque;
    }

    private async findChequeBychequeBook (chequeBook: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.find({ chequeBook });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }

        return cheque;
    }

    private async findChequeBybankAccount (bankaccount: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.find({ bankaccount });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }

        return cheque;
    }

  
    private async findChequeByComment (comment: string): Promise<Cheque> {
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





