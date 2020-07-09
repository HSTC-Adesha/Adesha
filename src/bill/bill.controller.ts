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
    @Body('cheque') billcheque :string,
    @Body('company') billcompany :string,
    @Body ('comment') billcomment :string,) {
     const generateid = await this.billsService.insertbill (
        billnumber,
        billcheque,
        billcompany,
        billcomment);
        return {id: generateid};
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
    @Get('cheque/:cheque')
    getBillByCheque(@Param('cheque') billcheque: string){
        return this.billsService.getBillByCheque(billcheque);
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
     @Body('cheque') billcheque: string,
     @Body('company') billcompany: string,
     @Body('comment') billcomment: string,)
     {
        await this.billsService.updatebill(
        billid,
        billnumber,
        billcheque,
        billcompany,
        billcomment);
        return null;
     }
     @Delete(':id')
     async removebill( @Param('id') billid: string,){
        await this.billsService.deletebill(billid);
         return null;
     }
    }

