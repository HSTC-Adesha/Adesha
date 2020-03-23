import { Controller, Post, Get, Param, Patch, Delete, Body } from "@nestjs/common";
import { Mychecksservice } from "./myChecks.service";


@Controller('checks')
export class Mycheckscontroller {
    constructor ( private readonly mycheckservice: Mychecksservice) {
    }



    @Post()
    async  addcheck(
    @Body('checkNum') checkcheckNum : string,
    @Body('billNum') checkbillNum :string,
    @Body ('checkbookNum') checkcheckbookNum :string, 
    @Body ('bankName') checkbankName :string,
    @Body ('DueDate') checkDueDate :string,
    @Body ('CreationDate') checkCreationDate :string, 
    @Body ('AmountToBePaid') checkAmountToBePaid :string, 
    @Body ('EmittedCheck') checkEmittedCheck :string, 
    @Body ('personTransmitterOfCheck') checkpersonTransmitterOfCheck :string, 
    @Body ('checkDestination') checkcheckDestination :string, 
    @Body ('personReceiverOfCheck') checkpersonReceiverOfCheck :string, 
    @Body ('placeOfCreation') checkplaceOfCreation :string, 
    @Body ('placeOfPayment') checkplaceOfPayment:string) {
     const generateid = await this.mycheckservice.insertcheck (
            checkcheckNum, 
            checkbillNum, 
            checkcheckbookNum, 
            checkbankName, 
            checkDueDate,
            checkCreationDate, 
            checkAmountToBePaid,
            checkEmittedCheck,
            checkpersonTransmitterOfCheck,
            checkcheckDestination,
            checkpersonReceiverOfCheck,
            checkplaceOfCreation,
            checkplaceOfPayment );
    
            return {id: generateid}; 
    }



    @Get()
    async getAllchecks(){
        const checks = await this.mycheckservice.getchecks();
        return checks;
    }  




    @Get('id/:checkid')
    getuncheck(@Param('id') checkid: string){
        return this.mycheckservice.getUncheck(checkid);
    }
   

    @Get('checkNum/: checkcheckNum')
    getuncheq(@Param('checkNum') checkcheckNum: string){
        return this.mycheckservice.getUncheq(checkcheckNum);
    }


    @Get('billNum/: checkbillNum')
    getunch(@Param('billNum') checkbillNum: string){
        return this.mycheckservice.getUnch(checkbillNum);
    }



    @Get('checkbookNum/: checkcheckbookNum')
    getunchq(@Param('checkbookNum') checkcheckbookNum: string){
        return this.mycheckservice.getUnchq(checkcheckbookNum);
    }



    @Get('bankName/: checkbankName')
    getchecks(@Param('bankName') checkbankName: string){
        return this.mycheckservice.getChecks(checkbankName);
    }



    @Get('DueDate/: checkDueDate')
    getdeschecks(@Param('DueDate') checkDueDate: string){
        return this.mycheckservice.getdescheckS(checkDueDate);
    }



    @Get('CreationDate/: checkCreationDate')
    getleschecks(@Param('CreationDate') checkCreationDate: string,){
        return this.mycheckservice.getleschEques(checkCreationDate);
    }



    @Get('AmountToBePaid/: checkAmountToBePaid')
    getmychecks(@Param('AmountToBePaid') checkAmountToBePaid: string){
        return this.mycheckservice.getmescheckS(checkAmountToBePaid);
    }



    @Get('EmittedCheck/: checkEmittedCheck')
    getMeschecks(@Param('EmittedCheck') checkEmittedCheck: string){
        return this.mycheckservice.getMescheckS(checkEmittedCheck);
    }



    @Get('personTransmitterOfCheck/: checkpersonTransmitterOfCheck')
    getmesCheck(@Param('personTransmitterOfCheck') checkpersonTransmitterOfCheck:string){
        return this.mycheckservice.getmesChequE(checkpersonTransmitterOfCheck);
    }



    @Get('checkDestination/: checkcheckDestination')
    getMesCheck(@Param('checkDestination') checkcheckDestination:string){
        return this.mycheckservice.getMesCheQue(checkcheckDestination);
    }



    @Get('personReceiverOfCheck/: checkpersonReceiverOfCheck')
    getLeschecks(@Param('personReceiverOfCheck') checkpersonReceiverOfCheck:string){
        return this.mycheckservice. getLescheckS(checkpersonReceiverOfCheck);
    }



    @Get('placeOfCreation/: checkplaceOfCreation')
    getlesChecks(@Param('placeOfCreation') checkplaceOfCreation:string){
        return this.mycheckservice.getlesCheckS(checkplaceOfCreation);
    }



    @Get('placeOfPayment/: checkplaceOfPayment')
    getLesChecks(@Param('placeOfPayment') checkplaceOfPayment:string,){
        return this.mycheckservice. getLesCheckS(checkplaceOfPayment);
    }




    @Patch(':id')

    async updatecheck(
     @Param('id') checkid: string,
     @Body('checkNum') checkcheckNum: string,
     @Body('billNum') checkbillNum: string,
     @Body('checkbookNum') checkcheckbookNum: string,
     @Body('bankName') checkbankName: string,
     @Body('DueDate') checkDueDate: string,
     @Body('CreationDate') checkCreationDate: string,
     @Body('AmountToBePaid') checkAmountToBePaid: string,
     @Body('EmittedCheck') checkEmittedCheck: string,
     @Body('personTransmitterOfCheck') checkpersonTransmitterOfCheck: string,
     @Body('checkDestination') checkcheckDestination: string,
     @Body('personReceiverOfCheck') checkpersonReceiverOfCheck: string,
     @Body('lieupai') checkplaceOfPayment: string,
     @Body('lieucre') checkplaceOfCreation: string,)
     {
        await this.mycheckservice.updatecheck(
        checkid,
        checkcheckNum, 
        checkbillNum, 
        checkcheckbookNum, 
        checkbankName, 
        checkDueDate,
        checkCreationDate, 
        checkAmountToBePaid,
        checkEmittedCheck,
        checkpersonTransmitterOfCheck,
        checkcheckDestination,
        checkpersonReceiverOfCheck,
        checkplaceOfCreation,
        checkplaceOfPayment);
        return null;
     }




     @Delete(':id')
     async removecheck( @Param('id') checkid: string,){
        await this.mycheckservice.deletecheck(checkid);
         return null; 
     }



    }

