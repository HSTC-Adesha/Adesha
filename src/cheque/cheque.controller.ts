import { Controller, Post, Get, Param, Patch, Delete, Body, HttpException, HttpStatus, UseFilters} from '@nestjs/common';
import { ChequeService } from './cheque.service';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('cheque')
@ApiUseTags('Cheque')
export class ChequeController {
    constructor ( private readonly chequesService: ChequeService) {
    }
    @Post()
    async  addcheque(
    @Body('number') chequenumber :string,
    @Body('billnumber') chequebillNumber :string,
    @Body('amount') chequeamount:string,
    @Body('dueDate') chequedueDate :string,
    @Body('creationDate') chequecreationDate :string,
    @Body('placeOfCreation') chequeplaceOfCreation :string,
    @Body ('comment') chequecomment :string,) {
     const generateid = await this.chequesService.insertcheque (
        chequenumber,
        chequebillNumber,
        chequeamount,
        chequedueDate,
        chequecreationDate,
        chequeplaceOfCreation,
        chequecomment);
        return {id: generateid};
    }
    @Get()
    async getAllcheques(){
        const cheques = await this.chequesService.getcheques();
        return cheques;
    }
    @Get('id/:bankid')
    getCHEQUE(@Param('chequeid') chequeid: string){
        return this.chequesService.getCHEQUE(chequeid);
    }
    @Get('Number/:Number')
    getthecheque(@Param('Number') chequenumber: string){
        return this.chequesService.getthecheque(chequenumber);
    }
    @Get('Bill Number/:Bill Number')
    gettheCHEQUE(@Param('Bill Number') chequebillNumber:string,){
        return this.chequesService. gettheCHEQUE(chequebillNumber);
    }
    @Get('Amount/:Amount')
    getTHECHEQUE(@Param('Amount') chequeamount:string,){
        return this.chequesService. getTHECHEQUE(chequeamount);
    }
    @Get('Due Date/:Due Date')
    getThecheque(@Param(':Due Date') chequedueDate:string,){
        return this.chequesService. getThecheque(chequedueDate);
    }
    @Get('Creation Date/:Creation Date')
    getTheCheque(@Param('Amount') chequecreationDate:string,){
        return this.chequesService. getTheCheque(chequecreationDate);
    }
    @Get('Place Of Creation/:Place Of Creation')
    getTHeCHeque(@Param('Place Of Creation') chequeplaceOfCreation:string,){
        return this.chequesService. getTHeCHeque(chequeplaceOfCreation);
    }
    @Get('Commment/:Commment')
    getTHECHEque(@Param('Commment')  chequecomment:string,){
        return this. chequesService. getTHECHEque( chequecomment);
    }
    @Patch(':id')
    async updatebank(
     @Param('id') chequeid: string,
     @Body('number') chequenumber: string,
     @Body('billNumber') chequebillNumber: string,
     @Body('amount') chequeamount: string,
     @Body('dueDate') chequedueDate: string,
     @Body('creationDate') chequecreationDate: string,
     @Body('chequeplaceOfCreation') chequeplaceOfCreation: string,
     @Body('comment') chequecomment: string,)
     
     {
        await this.chequesService.updatecheque(
        chequeid,
        chequenumber,
        chequebillNumber,
        chequeamount,
        chequedueDate,
        chequecreationDate,
        chequeplaceOfCreation,
        chequecomment);
        return null;
     }
     @Delete(':id')
     async removecheque( @Param('id') chequeid: string,){
        await this.chequesService.deletecheque(chequeid);
         return null;
     }
    }

