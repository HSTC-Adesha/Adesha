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
        @Body('chequeplaceOfCreation') chequeplaceOfCreation: string,
        @Body('bank') chequebank: string,
        @Body('company') chequecompany: string,
        @Body('delivredTo') chequedelivredTo: string,
        @Body('chequeBook') chequechequeBook: string,
        @Body('bankaccount') chequebankaccount: string,
        @Body('comment') chequecomment: string,) {
     const generateid = await this.chequesService.insertcheque (
        chequenumber,
        chequeamount,
        received,
        status,
        chequedueDate,
        chequecreationDate,
        chequeplaceOfCreation,
        chequebank,
        chequecompany,
        chequedelivredTo,
        chequechequeBook,
        chequebankaccount,
        chequecomment);
        return generateid;
    }
    @Get()
    async getAllCheques(){
        return await this.chequesService.getAllCheques();
       
    }
    @Get('id/:bankid')
    getChequeById(@Param('chequeid') chequeid: string){
        return this.chequesService.getChequeById(chequeid);
    }
    @Get('Number/:Number')
    getChequeByNumber(@Param('Number') chequenumber: string){
        return this.chequesService.getChequeByNumber(chequenumber);
    }
    @Get('Amount/:Amount')
    getChequeByAmount(@Param('Amount') chequeamount:string,){
        return this.chequesService. getChequeByAmount(chequeamount);
    }
    @Get('Due Date/:Due Date')
    getChequeByDueDate(@Param(':Due Date') chequedueDate:string,){
        return this.chequesService. getChequeByDueDate(chequedueDate);
    }
    @Get('Creation Date/:Creation Date')
    getChequeByCreationDate(@Param('Amount') chequecreationDate:string,){
        return this.chequesService. getChequeByCreationDate(chequecreationDate);
    }
    @Get('Place Of Creation/:Place Of Creation')
    getChequeByPlaceOfCreation(@Param('Place Of Creation') chequeplaceOfCreation:string,){
        return this.chequesService. getChequeByPlaceOfCreation(chequeplaceOfCreation);
        
    }
    @Get('bank/:bank')
    getChequeBybank(@Param('bank') chequeplaceOfCreation:string,){
        return this.chequesService. getChequeBybank(chequeplaceOfCreation);
        
    }
    @Get('company/:company')
    getChequeBycompany(@Param('company') chequeplaceOfCreation:string,){
        return this.chequesService. getChequeBycompany(chequeplaceOfCreation);
        
    }
    @Get('Receiver/:Receiver')
    getChequeByReceiver(@Param('Place Of Creation') chequeplaceOfCreation:string,){
        return this.chequesService. getChequeByReceiver(chequeplaceOfCreation);
        
    }
    @Get('chequeBook/:chequeBook')
    getChequeBychequeBook(@Param('Place Of Creation') chequeplaceOfCreation:string,){
        return this.chequesService. getChequeBychequeBook(chequeplaceOfCreation);
        
    }
    @Get('bankaccount/:bankaccount')
    getChequeBybankaccount(@Param('Place Of Creation') chequeplaceOfCreation:string,){
        return this.chequesService. getChequeBybankAccount(chequeplaceOfCreation);
        
    }
    @Get('Commment/:Commment')
    getChequeByComment(@Param('Commment')  chequecomment:string,){
        return this. chequesService. getChequeByComment( chequecomment);
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
     @Body('chequeplaceOfCreation') chequeplaceOfCreation: string,
     @Body('bank') chequebank: string,
     @Body('company') chequecompany: string,
     @Body('delivredTo') chequedelivredTo: string,
     @Body('chequeBook') chequechequeBook: string,
     @Body('bankaccount') chequebankaccount: string,
     @Body('comment') chequecomment: string,)
     
     {
        await this.chequesService.updatecheque(
        chequeid,
        chequenumber,
        chequeamount,
        chequedueDate,
        chequecreationDate,
        chequeplaceOfCreation,
        chequebank,
        chequecompany,
        chequedelivredTo,
        chequechequeBook,
        chequebankaccount,
        chequecomment,
        );
        return null;
     }
     @Delete(':id')
     async removecheque( @Param('id') chequeid: string,){
        await this.chequesService.deletecheque(chequeid);
         return null;
     }
    }

