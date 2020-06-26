import { Controller, Post, Get, Param, Patch, Delete, Body, HttpException, HttpStatus, UseFilters} from '@nestjs/common';
import { BankAccountService } from './bankaccount.service';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('bankaccount')
@ApiUseTags('BankAccount')
export class BankAccountController {
    constructor ( private readonly banksService: BankAccountService) {
    }
    @Post()
    async  addbank(
    @Body('Number') number :string,
) {
     return await this.banksService.insertbankAccount (
        number);
    }
    @Get()
    async getAllbanks(){
        return await this.banksService.getbankAccounts();
    }
    @Get('id/:bankAccountid')
    getBANK(@Param('bankid') bankid: string){
        return this.banksService.getBankAccountById(bankid);
    }
    @Get('Name/:Number')
    getthebank(@Param('Number') number: string){
        return this.banksService.getthebankAccountByNumber(number);
    }
  
    @Patch(':id')
    async updatebank(
     @Param('id') bankid: string,
     @Body('number') number: string)
     {
        await this.banksService.updatebankAccount(
        bankid,
        number,
);
        return null;
     }
     @Delete(':id')
     async removebank( @Param('id') bankid: string,){
        await this.banksService.deletebankAccount(bankid);
         return null;
     }
    }

