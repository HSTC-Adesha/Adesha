import { Controller, Post, Get, Param, Patch, Delete, Body, HttpException, HttpStatus, UseFilters} from '@nestjs/common';
import { BillService } from './bill.service';

@Controller('bill')


export class BillController {
    constructor ( private readonly billsService: BillService) {
    }
    @Post()
    async  addbill(
    @Body('number') billnumber :string,
    @Body ('comment') billcomment :string,) {
     const generateid = await this.billsService.insertbill (
        billnumber,
        billcomment);
        return {id: generateid};
    }
    @Get()
    async getAllbills(){
        const bills = await this.billsService.getbills();
        return bills;
    }
    @Get('id/:billid')
    getBILL(@Param('billid') billid: string){
        return this.billsService.getBILL(billid);
    }
    @Get('Number/:Number')
    getthebill(@Param('number') billnumber: string){
        return this.billsService.getthebill(billnumber);
    }
    @Get('comment/:comment')
    gettheBill(@Param('comment') billcomment:string,){
        return this.billsService. gettheBill(billcomment);
    }
    @Patch(':id')
    async updatebILL(
     @Param('id') billid: string,
     @Body('number') billnumber: string,
     @Body('comment') billcomment: string,)
     {
        await this.billsService.updatebill(
        billid,
        billnumber,
        billcomment);
        return null;
     }
     @Delete(':id')
     async removebill( @Param('id') billid: string,){
        await this.billsService.deletebill(billid);
         return null;
     }
    }

