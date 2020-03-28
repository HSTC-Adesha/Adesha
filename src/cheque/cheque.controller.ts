import { Controller, Post, Get, Param, Patch, Delete, Body } from '@nestjs/common';
import { ChequeService } from './cheque.service';

@Controller('cheque')
export class ChequeController {
    constructor ( private readonly chequesService: ChequeService) {
    }
    @Post()
    async  addcheque(
    @Body('chequeNum') chequechequeNum : string,
    @Body('billNum') chequebillNum :string,
    @Body ('chequebookNum') chequechequebookNum :string,
    @Body ('bankName') chequebankName :string,
    @Body ('dueDate') chequeDueDate :string,
    @Body ('creationDate') chequeCreationDate :string,
    @Body ('amountToBePaid') chequeAmountToBePaid :string,
    @Body ('emittedCheque') chequeEmittedCheque :string,
    @Body ('personTransmitterOfCheque') chequepersonTransmitterOfCheque :string,
    @Body ('chequeDestination') chequechequeDestination :string,
    @Body ('personReceiverOfCheque') chequepersonReceiverOfCheque :string,
    @Body ('placeOfCreation') chequeplaceOfCreation :string,
    @Body ('placeOfPayment') chequeplaceOfPayment:string) {
     const generateid = await this.chequesService.insertcheque (
            chequechequeNum,
            chequebillNum,
            chequechequebookNum,
            chequebankName,
            chequeDueDate,
            chequeCreationDate,
            chequeAmountToBePaid,
            chequeEmittedCheque,
            chequepersonTransmitterOfCheque,
            chequechequeDestination,
            chequepersonReceiverOfCheque,
            chequeplaceOfCreation,
            chequeplaceOfPayment );

            return {id: generateid};
    }
    @Get()
    async getAllcheques(){
        const cheques = await this.chequesService.getcheques();
        return cheques;
    }
    @Get('id/:chequeid')
    getuncheque(@Param('chequeid') chequeid: string){
        return this.chequesService.getUncheque(chequeid);
    }
    @Get('Number/:Num')
    getuncheq(@Param('Num') chequechequeNum: string){
        return this.chequesService.getUncheq(chequechequeNum);
    }
    @Get('bill/:bill')
    getunch(@Param('bill') chequebillNum: string){
        return this.chequesService.getUnch(chequebillNum);
    }
    @Get('book/:bookNumber')
    getunchq(@Param('bookNumber') chequechequebookNum: string){
        return this.chequesService.getUnchq(chequechequebookNum);
    }
    @Get('bank/:bankName')
    getcheques(@Param('bankName') chequebankName: string){
        return this.chequesService.getCheques(chequebankName);
    }
    @Get('due/:date')
    getdescheques(@Param('date') chequeDueDate: string){
        return this.chequesService.getdeschequeS(chequeDueDate);
    }
    @Get('created/:date')
    getlescheques(@Param('date') chequeCreationDate: string,){
        return this.chequesService.getleschEques(chequeCreationDate);
    }
    @Get('amount/:amount')
    getmycheques(@Param('amount') chequeAmountToBePaid: string){
        return this.chequesService.getmeschequeS(chequeAmountToBePaid);
    }
    @Get('emitted/:emitted')
    getMescheques(@Param('emitted') chequeEmittedCheque: string){
        return this.chequesService.getMeschequeS(chequeEmittedCheque);
    }
    @Get('transmitter/:transmitter')
    getmesCheque(@Param('transmitter') chequepersonTransmitterOfCheque:string){
        return this.chequesService.getmesChequE(chequepersonTransmitterOfCheque);
    }
    @Get('destinatator/:destinatator')
    getMesCheque(@Param('destinatator') chequechequeDestination:string){
        return this.chequesService.getMesCheQue(chequechequeDestination);
    }
    @Get('receiver/:receiver')
    getLescheques(@Param('receiver') chequepersonReceiverOfCheque:string){
        return this.chequesService. getLeschequeS(chequepersonReceiverOfCheque);
    }
    @Get('createdAt/:createdAt')
    getlesCheques(@Param('createdAt') chequeplaceOfCreation:string){
        return this.chequesService.getlesChequeS(chequeplaceOfCreation);
    }
    @Get('payedAt/:payedAt')
    getLesCheques(@Param('payedAt') chequeplaceOfPayment:string,){
        return this.chequesService. getLesChequeS(chequeplaceOfPayment);
    }
    @Patch(':id')
    async updatecheque(
     @Param('id') chequeid: string,
     @Body('chequeNum') chequechequeNum: string,
     @Body('billNum') chequebillNum: string,
     @Body('chequebookNum') chequechequebookNum: string,
     @Body('bankName') chequebankName: string,
     @Body('dueDate') chequeDueDate: string,
     @Body('creationDate') chequeCreationDate: string,
     @Body('amountToBePaid') chequeAmountToBePaid: string,
     @Body('emittedCheque') chequeEmittedCheque: string,
     @Body('personTransmitterOfCheque') chequepersonTransmitterOfCheque: string,
     @Body('chequeDestination') chequechequeDestination: string,
     @Body('personReceiverOfCheque') chequepersonReceiverOfCheque: string,
     @Body('lieupai') chequeplaceOfPayment: string,
     @Body('lieucre') chequeplaceOfCreation: string,)
     {
        await this.chequesService.updatecheque(
        chequeid,
        chequechequeNum,
        chequebillNum,
        chequechequebookNum,
        chequebankName,
        chequeDueDate,
        chequeCreationDate,
        chequeAmountToBePaid,
        chequeEmittedCheque,
        chequepersonTransmitterOfCheque,
        chequechequeDestination,
        chequepersonReceiverOfCheque,
        chequeplaceOfCreation,
        chequeplaceOfPayment);
        return null;
     }
     @Delete(':id')
     async removecheque( @Param('id') chequeid: string,){
        await this.chequesService.deletecheque(chequeid);
         return null;
     }
    }

