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
    @Body('delivredTo') delivredTo :string,
    @Body('company') company :string,
    @Body('bank') bank :string,) {
     const theChequeBook = await this.chequeBooksService.insertchequeBook (
        number,
        delivredTo,
        company,
        bank,
        );
        return theChequeBook;
    }
    @Get()
    async getAllchequeBooks(){
        const chequeBooks = await this.chequeBooksService.getchequeBooks();
        return chequeBooks;
    }
    @Get('id/:chequeBookid')
    getCHEQUEBOOK(@Param('chequeBookid') chequeBookid: string){
        return this.chequeBooksService.getCHEQUEBOOK(chequeBookid);
    }
    @Get('number/:number')
    getthechequeBook(@Param('number') chequeBooknumber: string){
        return this.chequeBooksService.getthechequeBook(chequeBooknumber);
    }
  
    @Patch(':id')
    async updatechequeBook(
     @Param('id') id: string,
     @Body('number') number: string,
     @Body('company') company: string,
     @Body('delivredTo') delivredTo: string,
     @Body('bank') bank: string,)
     {
        return await this.chequeBooksService.updatechequeBook(
        id,
        number,
        company,
        bank,
        delivredTo);
     }
     @Delete(':id')
     async removechequeBook( @Param('id')  chequeBookid: string,){
        await this. chequeBooksService.deletechequeBook( chequeBookid);
         return null;
     }
    }

