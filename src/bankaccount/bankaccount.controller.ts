import { Controller, Post, Get, Param, Patch, Delete, Body, HttpException, HttpStatus, UseFilters} from '@nestjs/common';
import { BankAccountService } from './bankaccount.service';
import { ApiUseTags } from '@nestjs/swagger';
import { Employee } from 'src/employee/employee.model';

@Controller('bankaccount')
@ApiUseTags('BankAccount')
export class BankAccountController {
    constructor ( private readonly BankAccountService: BankAccountService) {
    }
    @Post()
    async  addbank(
    @Body('Number') number :string,
    @Body('bank') bank :string,
    @Body('company') company :string,
    @Body('employee') employee :string,
) {
     return await this.BankAccountService.insertbankAccount (
        number,
        bank,
        company,
        employee);
    }
    @Get()
    async getAllBankAccounts(){
        return await this.BankAccountService.getAllBankAccounts();
    }
    @Get('id/:bankAccountid')
    getBankAccountById(@Param('bankid') bankid: string){
        return this.BankAccountService.getBankAccountById(bankid);
    }
    @Get('Name/:Number')
    getBankAccountByNumber(@Param('Number') number: string){
        return this.BankAccountService.getBankAccountByNumber(number);
    }
    @Get('bank/:bank')
    getBankAccountByBank(@Param('Bank') bank: string){
        return this.BankAccountService.getBankAccountByBank(bank);
    }
    @Get('company/:company')
    getbankAccountBycompany(@Param('company') company: string){
        return this.BankAccountService.getBankAccountBycompany(company);
    }
    @Get('employee/:employee')
    getBankAccountByemployee(@Param('employee') employee: string){
        return this.BankAccountService.getBankAccountByemployee(employee);
    }
    @Post('cheque/:bankAccountid')
    addcheque(@Param('bankAccountid') bankAccountid: string,
        @Body('cheque') cheque: string
    ) {
        return this.BankAccountService.addchequeTobankaccount(bankAccountid, cheque);
    }
    @Patch('cheque/:bankAccountid')
    removeEmployee(@Param('bankAccountid') bankAccountid: string,
        @Body('cheque') cheque: string
    ) {
        return this.BankAccountService.removechequeFrombankaccount(bankAccountid, cheque);
    }
  
    @Patch(':id')
    async updatebank(
     @Param('id') bankid: string,
     @Body('number') number: string,
     @Body('bank') bank: string,
     @Body('company') company: string,
     @Body('employee') employee: string)
     {
        await this.BankAccountService.updatebankAccount(
        bankid,
        number,
        bank,
        company,
        employee,
);
        return null;
     }
     @Delete(':id')
     async removebank( @Param('id') bankid: string,){
        await this.BankAccountService.deletebankAccount(bankid);
         return null;
     }
    }

