import { Controller, Post, Get, Param, Patch, Delete, Body} from '@nestjs/common';
import { ChequeService } from './cheque.service';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('cheque')
@ApiUseTags('Cheque')
export class ChequeController {
    constructor ( private readonly chequesService: ChequeService) {
    }
    @Post()
    async  addcheque(
        @Body('number') chequenumber: string,
        @Body('amount') chequeamount: string,
        @Body('received') received: boolean,
        @Body('status') status: string,
        @Body('dueDate') chequedueDate: string,
        @Body('creationDate') chequecreationDate: string,
        @Body('photo') photo: string,
        @Body('bank') chequebank: string,
        @Body('company') chequecompany: string,
        @Body('delivredTo') chequedelivredTo: string,
        @Body('chequeBook') chequechequeBook: string,
        @Body('bill') bill: [string],
        @Body('comment') chequecomment: string,) {
     return await this.chequesService.insertcheque (
        chequenumber,
        chequeamount,
        received,
        status,
        chequedueDate,
        chequecreationDate,
        photo,
        chequebank,
        chequecompany,
        chequedelivredTo,
        chequechequeBook,
        bill,
        chequecomment);
    }
    @Get()
    async getAllCheques(){
        return await this.chequesService.getAllCheques();
       
    }
    @Get('id/:chequeid')
    getChequeById(@Param('chequeid') chequeid: string){
        return this.chequesService.getChequeById(chequeid);
    }
    @Get('number/:number')
    getChequeByNumber(@Param('number') chequenumber: string){
        return this.chequesService.getChequeByNumber(chequenumber);
    }
    @Get('amount/:amount')
    getChequeByAmount(@Param('amount') chequeamount:string,){
        return this.chequesService.getChequeByAmount(chequeamount);
    }
    @Get('dueDate/:dueDate')
    getChequeByDueDate(@Param(':dueDate') chequedueDate:string,){
        return this.chequesService.getChequeByDueDate(chequedueDate);
    }
    @Get('creationDate/:creationDate')
    getChequeByCreationDate(@Param('creationDate') chequecreationDate:string,){
        return this.chequesService.getChequeByCreationDate(chequecreationDate);
    }
 
    @Get('bank/:bank')
    getChequeBybank(@Param('bank') bank:string,){
        return this.chequesService.getChequeBybank(bank);
        
    }
    @Get('company/:company')
    getChequeBycompany(@Param('company') company:string,){
        return this.chequesService.getChequeBycompany(company);
        
    }
    @Get('receiver/:receiver')
    getChequeByReceiver(@Param('receiver') receiver:string,){
        return this.chequesService.getChequeByReceiver(receiver);
        
    }
    @Get('chequeBook/:chequeBook')
    getChequeBychequeBook(@Param('chequeBook') chequeBook:string,){
        return this.chequesService.getChequeBychequeBook(chequeBook);
    }
 
    @Get('commment/:commment')
    getChequeByComment(@Param('commment')  chequecomment:string,){
        return this.chequesService.getChequeByComment( chequecomment);
    }
    @Post('bill/:chequeid')
    addBill(@Param('chequeid') chequeid: string,
        @Body('bill') bill: string
    ) {
        return this.chequesService.addBillToCheque(chequeid, bill);
    }
    @Patch('bill/:chequeid')
    removeBill(@Param('chequeid') chequeid: string,
        @Body('bill') bill: string
    ) {
        return this.chequesService.removeBillFromcheque(chequeid, bill);
    }
    @Patch(':id')
    async updatecheque(
     @Param('id') chequeid: string,
     @Body('number') chequenumber: string,
     @Body('amount') chequeamount: string,
     @Body('dueDate') chequedueDate: string,
     @Body('creationDate') chequecreationDate: string,
     @Body('photo') photo: string,
     @Body('bank') chequebank: string,
     @Body('company') chequecompany: string,
     @Body('delivredTo') chequedelivredTo: string,
     @Body('chequeBook') chequechequeBook: string,
     @Body('comment') chequecomment: string,)
     
     {
        return await this.chequesService.updatecheque(
        chequeid,
        chequenumber,
        chequeamount,
        chequedueDate,
        chequecreationDate,
        photo,
        chequebank,
        chequecompany,
        chequedelivredTo,
        chequechequeBook,
        chequecomment,
        );
     }

     @Patch('delete/:id')
     async removecheque( @Param('id') chequeid: string){
         console.log(chequeid,"delete started")
        await this.chequesService.deletecheque(chequeid);
         return 'done';
     }
    }

