import { Controller, Post, Get, Param, Patch, Delete, Body, HttpException, HttpStatus, UseFilters} from '@nestjs/common';
import { BillService } from './bill.service';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('bill')
@ApiUseTags('Bill')
export class BillController {
    constructor ( private readonly billsService: BillService) {
    }
    @Post()
    async  addbill(
    @Body('number') billnumber :string,
    @Body('ammount') billammount :string,
    @Body('company') billcompany :string,
    @Body ('comment') billcomment :string,) {
     return await this.billsService.insertbill (
        billnumber,
        billammount,
        billcompany,
        billcomment);
    }
    @Get()
    async getAllbills(){
        const bills = await this.billsService.getAllbills();
        return bills;
    }
    @Get('id/:billid')
    getBillById(@Param('billid') billid: string){
        return this.billsService.getBillById(billid);
    }
    @Get('Number/:Number')
    getBillByNumber(@Param('number') billnumber: string){
        return this.billsService.getBillByNumber(billnumber);
    }
    @Get('ammount/:ammount')
    getBillByCheque(@Param('ammount') ammount: string){
        return this.billsService.getBillByammount(ammount);
    }
    @Get('company/:company')
    getBillByCompany (@Param('company') billcompany: string){
        return this.billsService.getBillByCompany(billcompany);
    }
    @Get('comment/:comment')
    getBillByComment(@Param('comment') billcomment:string,){
        return this.billsService. getBillByComment(billcomment);
    }
    @Patch(':id')
    async updatebILL(
     @Param('id') billid: string,
     @Body('number') billnumber: string,
     @Body('ammount') ammount: string,
     @Body('company') billcompany: string,
     @Body('comment') billcomment: string,)
     {
        await this.billsService.updatebill(
        billid,
        billnumber,
        ammount,
        billcompany,
        billcomment);
        return null;
     }
     @Patch('delete/:id')
     async removebill( @Param('id') billid: string,){
        await this.billsService.deletebill(billid);
         return "done";
     }
    }

