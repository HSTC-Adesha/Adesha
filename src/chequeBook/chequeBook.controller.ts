import { Controller, Post, Get, Param, Patch, Delete, Body} from '@nestjs/common';
import { ChequeBookService } from './chequeBook.service';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('chequeBook')
@ApiUseTags('ChequeBook')
export class ChequeBookController {
    constructor ( private readonly chequeBooksService: ChequeBookService) {
    }
    @Post()
    async  addchequeBook(
    @Body('number') number :string,
    @Body('bank') bank :string,
    @Body('delivredTo') delivredTo :string,
    @Body('company') company :string,) {
     const theChequeBook = await this.chequeBooksService.insertchequeBook (
        number,
        bank,
        delivredTo,
        company,
        );
        return theChequeBook;
    }
    @Get()
    async getAllchequeBooks(){
        const chequeBooks = await this.chequeBooksService.getAllchequeBooks();
        return chequeBooks;
    }
    @Get('id/:chequeBookid')
    getchequeBooksById(@Param('chequeBookid') chequeBookid: string){
        return this.chequeBooksService.getchequeBooksById(chequeBookid);
    }
    @Get('number/:number')
    getchequeBooksByNumber(@Param('number') chequeBooknumber: string){
        return this.chequeBooksService.getchequeBooksByNumber(chequeBooknumber);
    }
    @Get('cheque/:cheque')
    getchequeBooksByCheque(@Param('cheque') cheques: string){
        return this.chequeBooksService.getchequeBooksByCheque(cheques);
    }
    @Get('bank/:bank')
    getchequeBooksByBank(@Param('Bank') chequeBookbank: string){
        return this.chequeBooksService.getchequeBooksByBank(chequeBookbank);
    }
    @Get('Receiver/:Receiver')
    getchequeBooksByReceiver(@Param('Receiver') chequeBookdelivredTo: string){
        return this.chequeBooksService.getchequeBooksByReceiver(chequeBookdelivredTo);
    }
    @Get('company/:company')
    getchequeBooksByCompany(@Param('Company') chequeBookcompany: string){
        return this.chequeBooksService.getchequeBooksByCompany(chequeBookcompany);
    }
    @Post('cheque/:chequeBookid')
    addBank(@Param('chequeBookid') chequeBookid: string,
        @Body('cheque') cheque: string
    ) {
        return this.chequeBooksService.addChequeTochequeBook(chequeBookid, cheque);
    }
    @Patch('cheque/:chequeBookid')
    removeBank(@Param('companyid') chequeBookid: string,
        @Body('cheque') cheque: string
    ) {
        return this.chequeBooksService.removeChequeFromchequeBook(chequeBookid, cheque);
    }
  
    @Patch(':id')
    async updatechequeBook(
     @Param('id') id: string,
     @Body('number') number: string,
     @Body('bank') bank: string,
     @Body('delivredTo') delivredTo: string,
     @Body('company') company: string,)
     {
        return await this.chequeBooksService.updatechequeBook(
        id,
        number,
        bank,
        delivredTo,
        company,
        );
     }
     @Delete(':id')
     async removechequeBook( @Param('id')  chequeBookid: string,){
        await this. chequeBooksService.deletechequeBook( chequeBookid);
         return null;
     }
    }

