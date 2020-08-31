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
    @Body ('comment') bankcomment :string,) {
     return await this.banksService.insertbank (
        bankname,
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
  
    @Patch(':id')
    async updatebank(
     @Param('id') bankid: string,
     @Body('name') bankname: string,
     @Body('comment') bankcomment: string,)
     
     {
       return await this.banksService.updatebank(
        bankid,
        bankname,
        bankcomment);
     }
     @Patch('delete/:id')
     async removebank( @Param('id') bankid: string,){
       return await this.banksService.deletebank(bankid);
     }
    }

