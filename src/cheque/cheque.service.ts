
import { Injectable, NotFoundException } from '@nestjs/common';
import { Cheque } from './cheque.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChequeService {


    private mycheques: Cheque[] = [];
    constructor(@InjectModel('Cheque') private readonly chequeModel: Model<Cheque>) { }
    async insertcheque(chequechequeNum: string, chequebillNum: string,
        chequechequebookNum: string, chequebankName: string,
        chequedueDate: string, chequecreationDate: string,
        chequeamountToBePaid: string, chequeemittedCheque: string,
        chequepersonTransmitterOfCheque: string, chequechequeDestination: string,
        chequeppersonReceiverOfCheque: string, chequeplaceOfCreation: string,
        chequeplaceOfPayment: string) {
        this.addcheque(chequechequeNum, chequebillNum, chequechequebookNum, chequebankName,
            chequedueDate, chequecreationDate, chequeamountToBePaid, chequeemittedCheque,
            chequepersonTransmitterOfCheque, chequechequeDestination, chequeppersonReceiverOfCheque,
            chequeplaceOfCreation, chequeplaceOfPayment)
    }
    async addcheque(
        chequeNum: string,
        billNum: string,
        chequebookNum: string,
        bankName: string,
        dueDate: string,
        creationDate: string,
        amountToBePaid: string,
        emittedCheque: string,
        personTransmitterOfCheque: string,
        chequeDestination: string,
        personReceiverOfCheque: string,
        placeOfCreation: string,
        placeOfPayment: string) {
        const newcheque = new this.chequeModel({
            chequeNum,
            billNum,
            chequebookNum,
            bankName,
            dueDate,
            creationDate,
            amountToBePaid,
            emittedCheque,
            personTransmitterOfCheque,
            chequeDestination,
            personReceiverOfCheque,
            placeOfCreation,
            placeOfPayment,
        });
        const result = await newcheque.save();
        return result.id as string;
    }
    async getcheques() {
        const cheques = await this.chequeModel.find().exec()
        return cheques.map(cheque => ({
            id: cheque.id,
            chequeNum: cheque.chequeNum,
            billNum: cheque.billNum,
            chequebookNum: cheque.chequebookNum,
            bankName: cheque.bankName,
            dueDat: cheque.dueDate,
            creationDate: cheque.creationDate,
            amountToBePaid: cheque.amountToBePaid,
            emittedCheque: cheque.emittedCheque,
            personTransmitterOfCheque: cheque.personTransmitterOfCheque,
            chequeDestination: cheque.chequeDestination,
            personReceiverOfCheque: cheque.personReceiverOfCheque,
            placeOfCreation: cheque.placeOfCreation,
            placeOfPayment: cheque.placeOfPayment,
        }));
    }

    async getUncheque(chequeid: string) {
        const cheque = await this.findcheque(chequeid);
        return {
            id: cheque.id,
            chequeNum: cheque.chequeNum,
            billNum: cheque.billNum,
            chequebookNum: cheque.chequebookNum,
            bankName: cheque.bankName,
            dueDat: cheque.dueDate,
            creationDate: cheque.creationDate,
            amountToBePaid: cheque.amountToBePaid,
            emittedCheque: cheque.emittedCheque,
            personTransmitterOfCheque: cheque.personTransmitterOfCheque,
            chequeDestination: cheque.chequeDestination,
            personReceiverOfCheque: cheque.personReceiverOfCheque,
            placeOfCreation: cheque.placeOfCreation,
            placeOfPayment: cheque.placeOfPayment,
        };
    }

    async getUncheq(chequechequeNum: string) {
        const cheque = await this.findchequeNum(chequechequeNum);
        return {
            id: cheque.id,
            chequeNum: cheque.chequeNum,
            billNum: cheque.billNum,
            chequebookNum: cheque.chequebookNum,
            bankName: cheque.bankName,
            dueDat: cheque.dueDate,
            creationDate: cheque.creationDate,
            amountToBePaid: cheque.amountToBePaid,
            emittedCheque: cheque.emittedCheque,
            personTransmitterOfCheque: cheque.personTransmitterOfCheque,
            chequeDestination: cheque.chequeDestination,
            personReceiverOfCheque: cheque.personReceiverOfCheque,
            placeOfCreation: cheque.placeOfCreation,
            placeOfPayment: cheque.placeOfPayment,
        };
    }

    async getUnch(chequebillNum: string) {
        const cheque = await this.findbillNum(chequebillNum);
        return {
            id: cheque.id,
            chequeNum: cheque.chequeNum,
            billNum: cheque.billNum,
            chequebookNum: cheque.chequebookNum,
            bankName: cheque.bankName,
            dueDat: cheque.dueDate,
            creationDate: cheque.creationDate,
            amountToBePaid: cheque.amountToBePaid,
            emittedCheque: cheque.emittedCheque,
            personTransmitterOfCheque: cheque.personTransmitterOfCheque,
            chequeDestination: cheque.chequeDestination,
            personReceiverOfCheque: cheque.personReceiverOfCheque,
            placeOfCreation: cheque.placeOfCreation,
            placeOfPayment: cheque.placeOfPayment,
        };
    }

    async getUnchq(chequechequebookNum: string) {
        const cheque = await this.findchequebookNum(chequechequebookNum);
        return {
            id: cheque.id,
            chequeNum: cheque.chequeNum,
            billNum: cheque.billNum,
            chequebookNum: cheque.chequebookNum,
            bankName: cheque.bankName,
            dueDat: cheque.dueDate,
            creationDate: cheque.creationDate,
            amountToBePaid: cheque.amountToBePaid,
            emittedCheque: cheque.emittedCheque,
            personTransmitterOfCheque: cheque.personTransmitterOfCheque,
            chequeDestination: cheque.chequeDestination,
            personReceiverOfCheque: cheque.personReceiverOfCheque,
            placeOfCreation: cheque.placeOfCreation,
            placeOfPayment: cheque.placeOfPayment,
        };
    }

    async getCheques(chequebankName: string) {
        const cheque = await this.findbankName(chequebankName);
        return {
            id: cheque.id,
            chequeNum: cheque.chequeNum,
            billNum: cheque.billNum,
            chequebookNum: cheque.chequebookNum,
            bankName: cheque.bankName,
            dueDat: cheque.dueDate,
            creationDate: cheque.creationDate,
            amountToBePaid: cheque.amountToBePaid,
            emittedCheque: cheque.emittedCheque,
            personTransmitterOfCheque: cheque.personTransmitterOfCheque,
            chequeDestination: cheque.chequeDestination,
            personReceiverOfCheque: cheque.personReceiverOfCheque,
            placeOfCreation: cheque.placeOfCreation,
            placeOfPayment: cheque.placeOfPayment,
        };
    }

    async getdeschequeS(chequedueDat: string) {
        const cheque = await this.finddueDat(chequedueDat);
        return {
            id: cheque.id,
            chequeNum: cheque.chequeNum,
            billNum: cheque.billNum,
            chequebookNum: cheque.chequebookNum,
            bankName: cheque.bankName,
            dueDat: cheque.dueDate,
            creationDate: cheque.creationDate,
            amountToBePaid: cheque.amountToBePaid,
            emittedCheque: cheque.emittedCheque,
            personTransmitterOfCheque: cheque.personTransmitterOfCheque,
            chequeDestination: cheque.chequeDestination,
            personReceiverOfCheque: cheque.personReceiverOfCheque,
            placeOfCreation: cheque.placeOfCreation,
            placeOfPayment: cheque.placeOfPayment,
        };
    }

    async getleschEques(chequecreationDate: string) {
        const cheque = await this.findcreationDate(chequecreationDate);
        return {
            id: cheque.id,
            chequeNum: cheque.chequeNum,
            billNum: cheque.billNum,
            chequebookNum: cheque.chequebookNum,
            bankName: cheque.bankName,
            dueDat: cheque.dueDate,
            creationDate: cheque.creationDate,
            amountToBePaid: cheque.amountToBePaid,
            emittedCheque: cheque.emittedCheque,
            personTransmitterOfCheque: cheque.personTransmitterOfCheque,
            chequeDestination: cheque.chequeDestination,
            personReceiverOfCheque: cheque.personReceiverOfCheque,
            placeOfCreation: cheque.placeOfCreation,
            placeOfPayment: cheque.placeOfPayment,
        };
    }

    async getmeschequeS(chequeamountToBePaid: string) {
        const cheque = await this.findamountToBePaid(chequeamountToBePaid);
        return {
            id: cheque.id,
            chequeNum: cheque.chequeNum,
            billNum: cheque.billNum,
            chequebookNum: cheque.chequebookNum,
            bankName: cheque.bankName,
            dueDat: cheque.dueDate,
            creationDate: cheque.creationDate,
            amountToBePaid: cheque.amountToBePaid,
            emittedCheque: cheque.emittedCheque,
            personTransmitterOfCheque: cheque.personTransmitterOfCheque,
            chequeDestination: cheque.chequeDestination,
            personReceiverOfCheque: cheque.personReceiverOfCheque,
            placeOfCreation: cheque.placeOfCreation,
            placeOfPayment: cheque.placeOfPayment,
        };
    }

    async getMeschequeS(chequeemittedCheque: string) {
        const cheque = await this.findemittedCheque(chequeemittedCheque);
        return {
            id: cheque.id,
            chequeNum: cheque.chequeNum,
            billNum: cheque.billNum,
            chequebookNum: cheque.chequebookNum,
            bankName: cheque.bankName,
            dueDat: cheque.dueDate,
            creationDate: cheque.creationDate,
            amountToBePaid: cheque.amountToBePaid,
            emittedCheque: cheque.emittedCheque,
            personTransmitterOfCheque: cheque.personTransmitterOfCheque,
            chequeDestination: cheque.chequeDestination,
            personReceiverOfCheque: cheque.personReceiverOfCheque,
            placeOfCreation: cheque.placeOfCreation,
            placeOfPayment: cheque.placeOfPayment,
        };
    }

    async getmesChequE(chequepersonTransmitterOfCheque: string) {
        const cheque = await this.findpersonTransmitterOfCheque(chequepersonTransmitterOfCheque);
        return {
            id: cheque.id,
            chequeNum: cheque.chequeNum,
            billNum: cheque.billNum,
            chequebookNum: cheque.chequebookNum,
            bankName: cheque.bankName,
            dueDat: cheque.dueDate,
            creationDate: cheque.creationDate,
            amountToBePaid: cheque.amountToBePaid,
            emittedCheque: cheque.emittedCheque,
            personTransmitterOfCheque: cheque.personTransmitterOfCheque,
            chequeDestination: cheque.chequeDestination,
            personReceiverOfCheque: cheque.personReceiverOfCheque,
            placeOfCreation: cheque.placeOfCreation,
            placeOfPayment: cheque.placeOfPayment,
        };
    }

    async getMesCheQue(chequechequeDestination: string) {
        const cheque = await this.findchequeDestination(chequechequeDestination);
        return {
            id: cheque.id,
            chequeNum: cheque.chequeNum,
            billNum: cheque.billNum,
            chequebookNum: cheque.chequebookNum,
            bankName: cheque.bankName,
            dueDat: cheque.dueDate,
            creationDate: cheque.creationDate,
            amountToBePaid: cheque.amountToBePaid,
            emittedCheque: cheque.emittedCheque,
            personTransmitterOfCheque: cheque.personTransmitterOfCheque,
            chequeDestination: cheque.chequeDestination,
            personReceiverOfCheque: cheque.personReceiverOfCheque,
            placeOfCreation: cheque.placeOfCreation,
            placeOfPayment: cheque.placeOfPayment,
        };
    }

    async getLeschequeS(chequepersonReceiverOfCheque: string) {
        const cheque = await this.findpersonReceiverOfCheque(chequepersonReceiverOfCheque);
        return {
            id: cheque.id,
            chequeNum: cheque.chequeNum,
            billNum: cheque.billNum,
            chequebookNum: cheque.chequebookNum,
            bankName: cheque.bankName,
            dueDat: cheque.dueDate,
            creationDate: cheque.creationDate,
            amountToBePaid: cheque.amountToBePaid,
            emittedCheque: cheque.emittedCheque,
            personTransmitterOfCheque: cheque.personTransmitterOfCheque,
            chequeDestination: cheque.chequeDestination,
            personReceiverOfCheque: cheque.personReceiverOfCheque,
            placeOfCreation: cheque.placeOfCreation,
            placeOfPayment: cheque.placeOfPayment,
        };
    }

    async getlesChequeS(chequeplaceOfCreation: string) {
        const cheque = await this.findplaceOfCreation(chequeplaceOfCreation);
        return {
            id: cheque.id,
            chequeNum: cheque.chequeNum,
            billNum: cheque.billNum,
            chequebookNum: cheque.chequebookNum,
            bankName: cheque.bankName,
            dueDat: cheque.dueDate,
            creationDate: cheque.creationDate,
            amountToBePaid: cheque.amountToBePaid,
            emittedCheque: cheque.emittedCheque,
            personTransmitterOfCheque: cheque.personTransmitterOfCheque,
            chequeDestination: cheque.chequeDestination,
            personReceiverOfCheque: cheque.personReceiverOfCheque,
            placeOfCreation: cheque.placeOfCreation,
            placeOfPayment: cheque.placeOfPayment,
        };
    }

    async getLesChequeS(chequeplaceOfPayment: string) {
        const cheque = await this.findplaceOfPayment(chequeplaceOfPayment);
        return {
            id: cheque.id,
            chequeNum: cheque.chequeNum,
            billNum: cheque.billNum,
            chequebookNum: cheque.chequebookNum,
            bankName: cheque.bankName,
            dueDat: cheque.dueDate,
            creationDate: cheque.creationDate,
            amountToBePaid: cheque.amountToBePaid,
            emittedCheque: cheque.emittedCheque,
            personTransmitterOfCheque: cheque.personTransmitterOfCheque,
            chequeDestination: cheque.chequeDestination,
            personReceiverOfCheque: cheque.personReceiverOfCheque,
            placeOfCreation: cheque.placeOfCreation,
            placeOfPayment: cheque.placeOfPayment,
        };
    }

    async updatecheque(
        chequeid: string,
        chequeNum: string,
        billNum: string,
        chequebookNum: string,
        bankName: string,
        dueDat: string,
        creationDate: string,
        amountToBePaid: string,
        emittedCheque: string,
        personTransmitterOfCheque: string,
        chequeDestination: string,
        personReceiverOfCheque: string,
        placeOfCreation: string,
        placeOfPayment: string) {
        const updatecheque = await this.findcheque(chequeid);
        if (chequeNum) {
            updatecheque.chequeNum = chequeNum;
        }
        if (billNum) {
            updatecheque.billNum = billNum;
        }
        if (chequebookNum) {
            updatecheque.chequebookNum = chequebookNum;
        }
        if (bankName) {
            updatecheque.bankName = bankName;
        }
        if (dueDat) {
            updatecheque.dueDate = dueDat;
        }

        if (creationDate) {
            updatecheque.creationDate = creationDate;
        }
        if (amountToBePaid) {
            updatecheque.amountToBePaid = amountToBePaid;
        }
        if (emittedCheque) {
            updatecheque.emittedCheque = emittedCheque;
        }
        if (personTransmitterOfCheque) {
            updatecheque.personTransmitterOfCheque = personTransmitterOfCheque;
        }
        if (chequeDestination) {
            updatecheque.chequeDestination = chequeDestination;
        }
        if (personReceiverOfCheque) {
            updatecheque.personReceiverOfCheque = personReceiverOfCheque;
        }
        if (placeOfCreation) {
            updatecheque.placeOfCreation = placeOfCreation;
        }
        if (placeOfPayment) {
            updatecheque.placeOfPayment = placeOfPayment;
        }
        const result = await updatecheque.save();
        return result;
    }

    async deletecheque(chequeid: string) {
        await this.chequeModel.findByIdAndDelete(chequeid);

    }

    private async findcheque(id: string): Promise<Cheque> {
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
    private async findchequeNum(chequeNum: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.findOne({ chequeNum });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }

        return cheque;
    }
    private async findbillNum(billNum: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.findOne({ billNum });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }

        return cheque;
    }
    private async findchequebookNum(chequebookNum: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.find({ chequebookNum });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }

        return cheque;
    }
    private async findbankName(bankName: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.find({ bankName });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }

        return cheque;
    }
    private async finddueDat(dueDat: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.find({ dueDat });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }

        return cheque;
    }
    private async findcreationDate(creationDate: string): Promise<Cheque> {
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

    private async findamountToBePaid(amountToBePaid: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.find({ amountToBePaid });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }
        return cheque;
    }


    private async findemittedCheque(emittedCheque: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.find({ emittedCheque });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }
        return cheque;
    }

    private async findpersonTransmitterOfCheque(personTransmitterOfCheque: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.find({ personTransmitterOfCheque });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }
        return cheque;
    }

    private async findchequeDestination(chequeDestination: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.find({ chequeDestination });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }
        return cheque;
    }

    private async findpersonReceiverOfCheque(personReceiverOfCheque: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.find({ personReceiverOfCheque });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }
        return cheque;
    }

    private async findplaceOfCreation(placeOfCreation: string): Promise<Cheque> {
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

    private async findplaceOfPayment(placeOfPayment: string): Promise<Cheque> {
        let cheque;
        try {

            cheque = await this.chequeModel.findOne({ placeOfPayment });
        } catch (error) {
            throw new NotFoundException('erreur!!');
        }
        if (!cheque) {
            throw new NotFoundException('erreur!!');
        }
        return cheque;
    }




}





