import { Controller, Post, Get, Param, Patch, Delete, Body, HttpException, HttpStatus, UseFilters} from '@nestjs/common';
import { BankService } from './bank.service';

@Controller('bank')


export class BankController {
    constructor ( private readonly banksService: BankService) {
    }
    @Post()
    async  addbank(
    @Body('name') bankname :string,
    @Body('city') bankcity :string,
    @Body('address') bankaddress :string,
    @Body ('comment') bankcomment :string,) {
     const generateid = await this.banksService.insertbank (
        bankname,
        bankcity,
        bankaddress,
        bankcomment);
        return {id: generateid};
    }
    @Get()
    async getAllbanks(){
        const banks = await this.banksService.getbanks();
        return banks;
    }
    @Get('id/:bankid')
    getBANK(@Param('bankid') bankid: string){
        return this.banksService.getBANK(bankid);
    }
    @Get('Name/:Name')
    getthebank(@Param('Name') bankname: string){
        return this.banksService.getthebank(bankname);
    }
    @Get('City/:City')
    gettheBANK(@Param('City') bankcity:string,){
        return this.banksService. gettheBANK(bankcity);
    }
    @Get('Address/:Address')
    getTHEBANK(@Param('Address') bankaddress:string,){
        return this.banksService. getTHEBANK(bankaddress);
    }
    @Get('Commment/:Commment')
    getTheBANK(@Param('Commment') bankcomment:string,){
        return this.banksService. getTheBANK(bankcomment);
    }
    @Patch(':id')
    async updatebank(
     @Param('id') bankid: string,
     @Body('name') bankname: string,
     @Body('city') bankcity: string,
     @Body('address') bankaddress: string,
     @Body('comment') bankcomment: string,)
     
     {
        await this.banksService.updatebank(
        bankid,
        bankname,
        bankcity,
        bankaddress,
        bankcomment);
        return null;
     }
     @Delete(':id')
     async removebank( @Param('id') bankid: string,){
        await this.banksService.deletebank(bankid);
         return null;
     }
    }

