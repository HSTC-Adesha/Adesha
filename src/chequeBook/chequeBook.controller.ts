import { Controller, Post, Get, Param, Patch, Delete, Body, HttpException, HttpStatus, UseFilters} from '@nestjs/common';
import { ChequeBookService } from './chequeBook.service';

@Controller('chequeBook')


export class ChequeBookController {
    constructor ( private readonly chequeBooksService: ChequeBookService) {
    }
    @Post()
    async  addchequeBook(
    @Body('number') chequeBooknumber :string,
    @Body('numberOfCheques') chequeBooknumberOfCheques :string,
    @Body ('comment') chequeBookcomment :string,) {
     const generateid = await this.chequeBooksService.insertchequeBook (
        chequeBooknumber,
        chequeBooknumberOfCheques,
        chequeBookcomment);
        return {id: generateid};
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
    @Get('Number/:Number')
    getthechequeBook(@Param('number') chequeBooknumber: string){
        return this.chequeBooksService.getthechequeBook(chequeBooknumber);
    }
    @Get('Number of cheques/:Number of cheques')
    getthechequeBOOK(@Param('numberOfCheques') chequeBooknumberOfCheques: string){
        return this.chequeBooksService.getthechequeBOOK(chequeBooknumberOfCheques);
    }
    @Get('comment/:comment')
    gettheChequeBook(@Param('comment') chequeBookcomment:string,){
        return this.chequeBooksService. gettheChequeBook(chequeBookcomment);
    }
    @Patch(':id')
    async updatechequeBook(
     @Param('id') chequeBookid: string,
     @Body('number') chequeBooknumber: string,
     @Body('numberOfCheques') chequeBooknumberOfCheques: string,
     @Body('comment') chequeBookcomment: string,)
     {
        await this.chequeBooksService.updatechequeBook(
        chequeBookid,
        chequeBooknumber,
        chequeBooknumberOfCheques,
        chequeBookcomment);
        return null;
     }
     @Delete(':id')
     async removechequeBook( @Param('id')  chequeBookid: string,){
        await this. chequeBooksService.deletechequeBook( chequeBookid);
         return null;
     }
    }

