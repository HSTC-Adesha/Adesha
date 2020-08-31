import { Injectable, NotFoundException} from '@nestjs/common';
import { Cheque } from './cheque.model';
import { BillService } from '../bill/bill.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class ChequeService {
    constructor(
        @InjectModel('Cheque') private readonly chequeModel: Model<Cheque>,
        private readonly billService: BillService,
        private readonly eventsGateway: EventsGateway,
    ) { }
    async insertcheque(chequenumber: string, chequeamount: string,received:boolean, status:string,chequedueDate: string, chequecreationDate: string, photo: string,
        chequebank: string, chequecompany: string, chequedelivredTo: string, chequechequeBook: string, bill: [string], chequecomment: string) {
       return this.addcheque(chequenumber, chequeamount,received,status, chequedueDate, chequecreationDate, photo, chequebank, chequecompany, chequedelivredTo, chequechequeBook, bill, chequecomment)
    }
    async addcheque(
        number: string,
        amount: string,
        received:boolean,
        status: string,
        dueDate: string,
        creationDate: string,
        photo: string,
        bank: string,
        company: string,
        delivredTo: string,
        chequeBook: string,
        bill: [string],
        comment: string) {
            var billsList = []
            for(var i =0;i<bill.length;i++)
            {
                let theBill = await this.billService.getBillById(bill[i]);
                billsList.push(theBill);
            }

        const newcheque = new this.chequeModel({
            number,
            amount,
            received,
            status,
            dueDate,
            creationDate,
            photo,
            bank,
            company,
            delivredTo,
            chequeBook,
            bills:billsList,
            comment,
        });
        const result = await newcheque.save();
        console.log(result)
        this.eventsGateway.server.emit('dbcheck',"eventDataObj");
        return result;
    }
    async getAllCheques() {
        return await this.chequeModel.find().populate('company').populate('chequeBook').populate('bills').populate('bank').exec()
    }

    async getChequeById(chequeid: string) {
        return await this.findChequeById(chequeid);
     
    }

    async getChequeByNumber(chequeNumber: string) {
        return await this.findChequeByNumber(chequeNumber);
       
    }


    async getChequeByAmount(chequeamount: string) {
        return await this.findChequeByAmount(chequeamount);
        
    }

    async getChequeByDueDate(chequedueDate: string) {
        return await this.findChequeByDueDate(chequedueDate);
       
    }
    async getChequeByCreationDate(chequecreationDate: string) {
        return await this.findChequeByCreationDate(chequecreationDate);
        
    }
  
    async getChequeBybank(chequebank: string) {
        return await this.findChequeBybank(chequebank);
        
    }
    async getChequeBycompany(chequecompany: string) {
        return await this.findChequeBycompany(chequecompany);
       
    }
    async getChequeByReceiver(chequedelivredTo: string) {
       return await this.findChequeByReceiver(chequedelivredTo);
      
    }
    async getChequeBychequeBook(chequechequeBook: string) {
        return await this.findChequeBychequeBook(chequechequeBook);
        
    }
    async getChequeByComment(chequecomment: string) {
        return await this.findChequeByComment(chequecomment);
    
    }

    async updatecheque(
        chequeid: string,
        number: string,
        amount: string,
        dueDate: string,
        creationDate: string,
        photo: string,
        bank: string,
        company: string,
        delivredTo: string,
        chequeBook: string,
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
        if (photo) {
            updateCheque.photo = photo;
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
        let updateCheque: Cheque = await this.findChequeById(chequeid);
        let theBill = await this.billService.getBillById(bill);
        if (theBill && updateCheque) {
            updateCheque.bills.push(theBill.id);
            updateCheque.save();

        }
        return updateCheque;
    }

    async removeBillFromcheque(
        chequeid: string,
        bill: string,
    ) {
        let updateCheque: Cheque = await this.findChequeById(chequeid);
        let theBill = await this.billService.getBillById(bill);

        if (theBill && updateCheque) {
            for (let i = 0; i < updateCheque.bills.length; i++) {
                if (updateCheque.bills[i] === theBill.id) {
                    updateCheque.bills.splice(i, 1);
                }
            }
            updateCheque.save();
        }
        return updateCheque;
    }
    async deletecheque(chequeid: string) {
        try {
            return  await this.chequeModel.findByIdAndDelete(chequeid);

        } catch (error) {
            return error;
        }

    }

    private async findChequeById(id: string): Promise<Cheque> {
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
    private async findChequeByNumber(number: string): Promise<Cheque> {
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

    private async findChequeByAmount(amount: string): Promise<Cheque> {
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
    private async findChequeByDueDate(dueDate: string): Promise<Cheque> {
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
    private async findChequeByCreationDate(creationDate: string): Promise<Cheque> {
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

    private async findChequeBycompany(company: string): Promise<Cheque> {
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
    private async findChequeBybank(bank: string): Promise<Cheque> {
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

    private async findChequeByReceiver(delivredTo: string): Promise<Cheque> {
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

    private async findChequeBychequeBook(chequeBook: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.find({ chequeBook }).populate('company');
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }

        return cheque;
    }

    private async findChequeBybankAccount(bankaccount: string): Promise<Cheque> {
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


    private async findChequeByComment(comment: string): Promise<Cheque> {
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





