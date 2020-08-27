import { Controller, Post, Get, Param, Patch, Delete, Body} from '@nestjs/common';
import { BankService } from './bank.service';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('bank')
@ApiUseTags('Bank')
export class BankController {
    constructor ( private readonly banksService: BankService) {
    }
    @Post()
    async  addbank(
    @Body('name') bankname :string,
    @Body('city') bankcity :string,
    @Body('address') bankaddress :string,
    @Body('company') bankcompany :string,
    @Body ('comment') bankcomment :string,) {
     return await this.banksService.insertbank (
        bankname,
        bankcity,
        bankaddress,
        bankcompany,
        bankcomment);
    }
    @Get()
    async getAllbanks(){
        return await this.banksService.getAllbanks();
    }
    @Get('id/:bankid')
    getBankById (@Param('bankid') bankid: string){
        return this.banksService.getBankById(bankid);
    }
    @Get('Name/:Name')
    getBankByname (@Param('Name') bankname: string){
        return this.banksService.getBankByname(bankname);
    }
    @Get('City/:City')
    getBankBycity (@Param('City') bankcity:string,){
        return this.banksService.getBankBycity(bankcity);
    }
    @Get('Address/:Address')
    getBankByaddress (@Param('Address') bankaddress:string,){
        return this.banksService.getBankByaddress(bankaddress);
    }
    @Get('Company/:Company')
    getBankBycompany (@Param('Company') bankcompany:string,){
        return this.banksService.getBankBycompany(bankcompany);
    }
    @Get('bankaccount/:bankaccount')
    getBankByBankAccount (@Param('bankaccount') bankAccounts:string,){
        return this.banksService.getBankByBankAccount(bankAccounts);
    }

    @Get('Comment/:Comment')
    getBankBycomment (@Param('Comment') bankcomment:string,){
        return this.banksService.getBankBycomment(bankcomment);
    }
    @Patch(':id')
    async updatebank(
     @Param('id') bankid: string,
     @Body('name') bankname: string,
     @Body('city') bankcity: string,
     @Body('address') bankaddress: string,
     @Body('company') bankcompany: string,
     @Body('comment') bankcomment: string,)
     
     {
        await this.banksService.updatebank(
        bankid,
        bankname,
        bankcity,
        bankaddress,
        bankcompany,
        bankcomment);
        return null;
     }
     @Delete(':id')
     async removebank( @Param('id') bankid: string,){
        await this.banksService.deletebank(bankid);
         return null;
     }
    }

