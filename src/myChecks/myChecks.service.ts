
import { Injectable, NotFoundException } from "@nestjs/common";
import {Check} from "./myChecks.model";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()

export class Mychecksservice {
   

      private mychecks: Check [] = [] ;
      constructor (@InjectModel('check') private readonly checkModel: Model<Check> ) {}
    
     async insertcheck(checkcheckNum: string, checkbillNum: string, checkcheckbookNum: string, checkbankName: string, checkDueDate: string, checkCreationDate: string, checkAmountToBePaid: string, checkEmittedCheck: string, checkpersonTransmitterOfCheck: string, checkcheckDestination: string, checkppersonReceiverOfCheck: string, checkplaceOfCreation: string, checkplaceOfPayment: string) {
        this.addcheck(checkcheckNum, checkbillNum, checkcheckbookNum, checkbankName, checkDueDate, checkCreationDate, checkAmountToBePaid, checkEmittedCheck, checkpersonTransmitterOfCheck, checkcheckDestination, checkppersonReceiverOfCheck, checkplaceOfCreation, checkplaceOfPayment)
    }
      async addcheck ( 
        checkNum: string,
        billNum: string,
        checkbookNum: string,
        bankName: string, 
        DueDate: string,
        CreationDate: string,
        AmountToBePaid: string,
        EmittedCheck:string,
        personTransmitterOfCheck:string,
        checkDestination: string,
        personReceiverOfCheck: string, 
        placeOfCreation:string, 
        placeOfPayment: string ) { 
        const newcheck = new this.checkModel ({
        checkNum, 
        billNum, 
        checkbookNum,  
        bankName,  
        DueDate,  
        CreationDate,  
        AmountToBePaid, 
        EmittedCheck,  
        personTransmitterOfCheck,  
        checkDestination,  
        personReceiverOfCheck,  
        placeOfCreation,  
        placeOfPayment,  });
        const result = await newcheck.save();
       return result.id as string;
       console.log(newcheck);
        }
        async getchecks(){
            const checks = await this.checkModel.find().exec() 
        return checks.map(check=> ({
            id: check.id,
            checkNum: check.checkNum,
            billNum: check.billNum,
            checkbookNum:check.checkbookNum,
            bankName: check.bankName,
            DueDate: check.DueDate,
            CreationDate: check.CreationDate,
            AmountToBePaid: check.AmountToBePaid,
            EmittedCheck: check.EmittedCheck,
            personTransmitterOfCheck: check.personTransmitterOfCheck,
            checkDestination: check.checkDestination,
            personReceiverOfCheck: check.personReceiverOfCheck,
            placeOfCreation: check.placeOfCreation,
            placeOfPayment: check.placeOfPayment,
        }));
    }

     async getUncheck(checkid: string){
       const check = await this.findcheck(checkid);
        return {
            id: check.id,
            checkNum: check.checkNum,
            billNum: check.billNum,
            checkbookNum:check.checkbookNum,
            bankName: check.bankName,
            DueDate: check.DueDate,
            CreationDate: check.CreationDate,
            AmountToBePaid: check.AmountToBePaid,
            EmittedCheck: check.EmittedCheck,
            personTransmitterOfCheck: check.personTransmitterOfCheck,
            checkDestination: check.checkDestination,
            personReceiverOfCheck: check.personReceiverOfCheck,
            placeOfCreation: check.placeOfCreation,
            placeOfPayment: check.placeOfPayment,
        };
    }

    async getUncheq(checkcheckNum: string){
        const check = await this.findcheckNum(checkcheckNum);
        return {
            id: check.id,
            checkNum: check.checkNum,
            billNum: check.billNum,
            checkbookNum:check.checkbookNum,
            bankName: check.bankName,
            DueDate: check.DueDate,
            CreationDate: check.CreationDate,
            AmountToBePaid: check.AmountToBePaid,
            EmittedCheck: check.EmittedCheck,
            personTransmitterOfCheck: check.personTransmitterOfCheck,
            checkDestination: check.checkDestination,
            personReceiverOfCheck: check.personReceiverOfCheck,
            placeOfCreation: check.placeOfCreation,
            placeOfPayment: check.placeOfPayment,
        };
    }

    async getUnch(checkbillNum: string){
        const check = await this.findbillNum(checkbillNum);
        return {
            id: check.id,
            checkNum: check.checkNum,
            billNum: check.billNum,
            checkbookNum:check.checkbookNum,
            bankName: check.bankName,
            DueDate: check.DueDate,
            CreationDate: check.CreationDate,
            AmountToBePaid: check.AmountToBePaid,
            EmittedCheck: check.EmittedCheck,
            personTransmitterOfCheck: check.personTransmitterOfCheck,
            checkDestination: check.checkDestination,
            personReceiverOfCheck: check.personReceiverOfCheck,
            placeOfCreation: check.placeOfCreation,
            placeOfPayment: check.placeOfPayment,
        };
    }
    
     async getUnchq(checkcheckbookNum: string){
        const check = await this.findcheckbookNum(checkcheckbookNum);
        return {
            id: check.id,
            checkNum: check.checkNum,
            billNum: check.billNum,
            checkbookNum:check.checkbookNum,
            bankName: check.bankName,
            DueDate: check.DueDate,
            CreationDate: check.CreationDate,
            AmountToBePaid: check.AmountToBePaid,
            EmittedCheck: check.EmittedCheck,
            personTransmitterOfCheck: check.personTransmitterOfCheck,
            checkDestination: check.checkDestination,
            personReceiverOfCheck: check.personReceiverOfCheck,
            placeOfCreation: check.placeOfCreation,
            placeOfPayment: check.placeOfPayment,
        };
    }
    
     async getChecks(checkbankName: string){
        const check = await this.findbankName(checkbankName);
        return {
            id: check.id,
            checkNum: check.checkNum,
            billNum: check.billNum,
            checkbookNum:check.checkbookNum,
            bankName: check.bankName,
            DueDate: check.DueDate,
            CreationDate: check.CreationDate,
            AmountToBePaid: check.AmountToBePaid,
            EmittedCheck: check.EmittedCheck,
            personTransmitterOfCheck: check.personTransmitterOfCheck,
            checkDestination: check.checkDestination,
            personReceiverOfCheck: check.personReceiverOfCheck,
            placeOfCreation: check.placeOfCreation,
            placeOfPayment: check.placeOfPayment,
        };
    }
    
    async getdescheckS(checkDueDate: string){
        const check = await this.findDueDate(checkDueDate);
        return {
            id: check.id,
            checkNum: check.checkNum,
            billNum: check.billNum,
            checkbookNum:check.checkbookNum,
            bankName: check.bankName,
            DueDate: check.DueDate,
            CreationDate: check.CreationDate,
            AmountToBePaid: check.AmountToBePaid,
            EmittedCheck: check.EmittedCheck,
            personTransmitterOfCheck: check.personTransmitterOfCheck,
            checkDestination: check.checkDestination,
            personReceiverOfCheck: check.personReceiverOfCheck,
            placeOfCreation: check.placeOfCreation,
            placeOfPayment: check.placeOfPayment,
        };
    }
    
    async getleschEques(checkCreationDate: string){
        const check = await this.findCreationDate(checkCreationDate);
        return {
            id: check.id,
            checkNum: check.checkNum,
            billNum: check.billNum,
            checkbookNum:check.checkbookNum,
            bankName: check.bankName,
            DueDate: check.DueDate,
            CreationDate: check.CreationDate,
            AmountToBePaid: check.AmountToBePaid,
            EmittedCheck: check.EmittedCheck,
            personTransmitterOfCheck: check.personTransmitterOfCheck,
            checkDestination: check.checkDestination,
            personReceiverOfCheck: check.personReceiverOfCheck,
            placeOfCreation: check.placeOfCreation,
            placeOfPayment: check.placeOfPayment,
    };
}
    
    async getmescheckS( checkAmountToBePaid: string){
        const check = await this.findAmountToBePaid (checkAmountToBePaid);
        return {
            id: check.id,
            checkNum: check.checkNum,
            billNum: check.billNum,
            checkbookNum:check.checkbookNum,
            bankName: check.bankName,
            DueDate: check.DueDate,
            CreationDate: check.CreationDate,
            AmountToBePaid: check.AmountToBePaid,
            EmittedCheck: check.EmittedCheck,
            personTransmitterOfCheck: check.personTransmitterOfCheck,
            checkDestination: check.checkDestination,
            personReceiverOfCheck: check.personReceiverOfCheck,
            placeOfCreation: check.placeOfCreation,
            placeOfPayment: check.placeOfPayment,
    };
}
    
    async getMescheckS(checkEmittedCheck: string){
        const check = await this.findEmittedCheck(checkEmittedCheck);
        return {
            id: check.id,
            checkNum: check.checkNum,
            billNum: check.billNum,
            checkbookNum:check.checkbookNum,
            bankName: check.bankName,
            DueDate: check.DueDate,
            CreationDate: check.CreationDate,
            AmountToBePaid: check.AmountToBePaid,
            EmittedCheck: check.EmittedCheck,
            personTransmitterOfCheck: check.personTransmitterOfCheck,
            checkDestination: check.checkDestination,
            personReceiverOfCheck: check.personReceiverOfCheck,
            placeOfCreation: check.placeOfCreation,
            placeOfPayment: check.placeOfPayment,
    };
}
    
    async getmesChequE(checkpersonTransmitterOfCheck: string){
        const check = await this.findpersonTransmitterOfCheck(checkpersonTransmitterOfCheck);
        return {
            id: check.id,
            checkNum: check.checkNum,
            billNum: check.billNum,
            checkbookNum:check.checkbookNum,
            bankName: check.bankName,
            DueDate: check.DueDate,
            CreationDate: check.CreationDate,
            AmountToBePaid: check.AmountToBePaid,
            EmittedCheck: check.EmittedCheck,
            personTransmitterOfCheck: check.personTransmitterOfCheck,
            checkDestination: check.checkDestination,
            personReceiverOfCheck: check.personReceiverOfCheck,
            placeOfCreation: check.placeOfCreation,
            placeOfPayment: check.placeOfPayment,
    };
}
    
    async getMesCheQue(checkcheckDestination: string){
        const check = await this.findcheckDestination(checkcheckDestination);
        return { 
        id: check.id,
        checkNum: check.checkNum,
        billNum: check.billNum,
        checkbookNum:check.checkbookNum,
        bankName: check.bankName,
        DueDate: check.DueDate,
        CreationDate: check.CreationDate,
        AmountToBePaid: check.AmountToBePaid,
        EmittedCheck: check.EmittedCheck,
        personTransmitterOfCheck: check.personTransmitterOfCheck,
        checkDestination: check.checkDestination,
        personReceiverOfCheck: check.personReceiverOfCheck,
        placeOfCreation: check.placeOfCreation,
        placeOfPayment: check.placeOfPayment,
    };
}
    
    async getLescheckS(checkpersonReceiverOfCheck: string){
        const check = await this.findpersonReceiverOfCheck(checkpersonReceiverOfCheck);
        return { 
            id: check.id,
            checkNum: check.checkNum,
            billNum: check.billNum,
            checkbookNum:check.checkbookNum,
            bankName: check.bankName,
            DueDate: check.DueDate,
            CreationDate: check.CreationDate,
            AmountToBePaid: check.AmountToBePaid,
            EmittedCheck: check.EmittedCheck,
            personTransmitterOfCheck: check.personTransmitterOfCheck,
            checkDestination: check.checkDestination,
            personReceiverOfCheck: check.personReceiverOfCheck,
            placeOfCreation: check.placeOfCreation,
            placeOfPayment: check.placeOfPayment,
    };
}
    
    async getlesCheckS(checkplaceOfCreation: string){
        const check = await this.findplaceOfCreation(checkplaceOfCreation);
        return { 
            id: check.id,
            checkNum: check.checkNum,
            billNum: check.billNum,
            checkbookNum:check.checkbookNum,
            bankName: check.bankName,
            DueDate: check.DueDate,
            CreationDate: check.CreationDate,
            AmountToBePaid: check.AmountToBePaid,
            EmittedCheck: check.EmittedCheck,
            personTransmitterOfCheck: check.personTransmitterOfCheck,
            checkDestination: check.checkDestination,
            personReceiverOfCheck: check.personReceiverOfCheck,
            placeOfCreation: check.placeOfCreation,
            placeOfPayment: check.placeOfPayment,
    };
}
    
    async getLesCheckS(checkplaceOfPayment: string){
        const check = await this.findplaceOfPayment(checkplaceOfPayment);
        return { 
            id: check.id,
            checkNum: check.checkNum,
            billNum: check.billNum,
            checkbookNum:check.checkbookNum,
            bankName: check.bankName,
            DueDate: check.DueDate,
            CreationDate: check.CreationDate,
            AmountToBePaid: check.AmountToBePaid,
            EmittedCheck: check.EmittedCheck,
            personTransmitterOfCheck: check.personTransmitterOfCheck,
            checkDestination: check.checkDestination,
            personReceiverOfCheck: check.personReceiverOfCheck,
            placeOfCreation: check.placeOfCreation,
            placeOfPayment: check.placeOfPayment,
    };
}

    async updatecheck(
    checkid:string,
    checkNum:string, 
    billNum:string, 
    checkbookNum:string, 
    bankName:string, 
    DueDate:string, 
    CreationDate:string, 
    AmountToBePaid:string, 
    EmittedCheck:string, 
    personTransmitterOfCheck:string, 
    checkDestination:string, 
    personReceiverOfCheck:string, 
    placeOfCreation:string, 
    placeOfPayment:string )
    {
    const updatecheck = await this.findcheck(checkid);
    if (checkNum) {
        updatecheck.checkNum=checkNum;
    }
    if (billNum) {
        updatecheck.billNum=billNum;
    }
    if (checkbookNum) {
        updatecheck.checkbookNum=checkbookNum;
    }
    if (bankName) {
        updatecheck.bankName=bankName;
    }
    if (DueDate) {
        updatecheck.DueDate=DueDate;
    }
   
    if (CreationDate) {
        updatecheck.CreationDate=CreationDate;
    }
    if(AmountToBePaid){
        updatecheck.AmountToBePaid=AmountToBePaid;
    }
    if (EmittedCheck) {
        updatecheck.EmittedCheck=EmittedCheck;
    }
    if (personTransmitterOfCheck) {
        updatecheck.personTransmitterOfCheck=personTransmitterOfCheck;
    }
    if (checkDestination) {
        updatecheck.checkDestination=checkDestination;
    }
    if (personReceiverOfCheck) {
        updatecheck.personReceiverOfCheck=personReceiverOfCheck;
    }
    if (placeOfCreation) {
        updatecheck.placeOfCreation=placeOfCreation;
    }
    if (placeOfPayment) {
        updatecheck.placeOfPayment=placeOfPayment;
    }
    const result = await updatecheck.save();
    return result; 
    }

    async deletecheck(checkid: string){
    await  this.checkModel.findByIdAndDelete(checkid);
    
    }
        
    private async findcheck (id:string): Promise <Check> {
        let check;
        try {
     check = await this.checkModel.findById(id).exec();
        } catch(error) {
            throw new NotFoundException("erreur!!");
        }
        if(!check){
            throw new NotFoundException("erreur!!");
        }
    
        return check;
    }
    private async findcheckNum (checkNum:string): Promise <Check> {
        let check;
        try {
    
     check = await this.checkModel.findOne({checkNum:checkNum});
        } catch(error) {
            throw new NotFoundException("erreur!!");
        }
        if(!check){
            throw new NotFoundException("erreur!!");
        }
    
        return check;
}
private async findbillNum (billNum:string): Promise <Check> {
    let check;
    try {

 check = await this.checkModel.findOne({billNum:billNum});
    } catch(error) {
        throw new NotFoundException("erreur!!");
    }
    if(!check){
        throw new NotFoundException("erreur!!");
    }

    return check;
}
private async findcheckbookNum (checkbookNum:string): Promise <Check> {
    let check;
    try {

 check = await this.checkModel.find({checkbookNum:checkbookNum});
    } catch(error) {
        throw new NotFoundException("erreur!!");
    }
    if(!check){
        throw new NotFoundException("erreur!!");
    }

    return check;
}
private async findbankName (bankName:string): Promise <Check> {
    let check;
    try {

 check = await this.checkModel.find({bankName:bankName});
    } catch(error) {
        throw new NotFoundException("erreur!!");
    }
    if(!check){
        throw new NotFoundException("erreur!!");
    }

    return check;
}
private async findDueDate (DueDate:string): Promise <Check> {
    let check;
    try {

 check = await this.checkModel.find({DueDate:DueDate});
    } catch(error) {
        throw new NotFoundException("erreur!!");
    }
    if(!check){
        throw new NotFoundException("erreur!!");
    }

    return check;
}
private async findCreationDate (CreationDate:string): Promise <Check> {
    let check;
    try {

 check = await this.checkModel.find({CreationDate:CreationDate});
    } catch(error) {
        throw new NotFoundException("erreur!!");
    }
    if(!check){
        throw new NotFoundException("erreur!!");
    }

    return check;
}

private async findAmountToBePaid(AmountToBePaid:string): Promise <Check> {
    let check;
    try {

 check = await this.checkModel.find({AmountToBePaid:AmountToBePaid});
    } catch(error) {
        throw new NotFoundException("erreur!!");
    }
    if(!check){
        throw new NotFoundException("erreur!!");
    }
    return check;
}


private async findEmittedCheck (EmittedCheck:string): Promise <Check> {
    let check;
    try {

 check = await this.checkModel.find({EmittedCheck:EmittedCheck});
    } catch(error) {
        throw new NotFoundException("erreur!!");
    }
    if(!check){
        throw new NotFoundException("erreur!!");
    }
    return check;
}

private async findpersonTransmitterOfCheck (personTransmitterOfCheck:string): Promise <Check> {
    let check;
    try {

 check = await this.checkModel.find({personTransmitterOfCheck:personTransmitterOfCheck});
    } catch(error) {
        throw new NotFoundException("erreur!!");
    }
    if(!check){
        throw new NotFoundException("erreur!!");
    }
    return check;
}

private async findcheckDestination (checkDestination:string): Promise <Check> {
    let check;
    try {

 check = await this.checkModel.find({checkDestination:checkDestination});
    } catch(error) {
        throw new NotFoundException("erreur!!");
    }
    if(!check){
        throw new NotFoundException("erreur!!");
    }
    return check;
}

private async findpersonReceiverOfCheck (personReceiverOfCheck:string): Promise <Check> {
    let check;
    try {

 check = await this.checkModel.find({personReceiverOfCheck:personReceiverOfCheck});
    } catch(error) {
        throw new NotFoundException("erreur!!");
    }
    if(!check){
        throw new NotFoundException("erreur!!");
    }
    return check;
}

private async findplaceOfCreation (placeOfCreation:string): Promise <Check> {
    let check;
    try {

 check = await this.checkModel.find({placeOfCreation:placeOfCreation});
    } catch(error) {
        throw new NotFoundException("erreur!!");
    }
    if(!check){
        throw new NotFoundException("erreur!!");
    }
    return check;
}

private async findplaceOfPayment (placeOfPayment:string): Promise <Check> {
    let check;
    try {

 check = await this.checkModel.findOne({placeOfPayment:placeOfPayment});
    } catch(error) {
        throw new NotFoundException("erreur!!");
    }
    if(!check){
        throw new NotFoundException("erreur!!");
    }
    return check;
}




}




    
