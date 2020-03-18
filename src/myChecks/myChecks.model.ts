
import *as mongoose from 'mongoose';
 
export const checkshema = new mongoose.Schema ({
    checkNumum: {type: String}, 
    billNum:{type: String, required:true },
    checkbookNum: {type: String, required:true }, 
    bankName: {type: String, required:true },
    DueDate: {type: String, required:true }, 
    CreationDate: {type: String, required:true }, 
    AmountToBePaid: {type:String, required:true }, 
    EmittedCheck: {type: String, required:true }, 
    personTransmitterOfCheck: {type: String, required:true }, 
    checkDestination: {type: String, required:true }, 
    personReceiverOfCheck: {type: String, required:true }, 
    placeOfCreation: {type: String, required:true }, 
    placeOfPayment: {type: String, required:true }, 
 
})

export class Check extends mongoose.Document {
    id: string;
    checkNumum: string; 
    billNum: string; 
    checkbookNum: string; 
    bankName: string; 
    DueDate: string; 
    CreationDate: string; 
    AmountToBePaid: string; 
    EmittedCheck: string; 
    personTransmitterOfCheck: string; 
    checkDestination: string; 
    personReceiverOfCheck: string; 
    placeOfCreation: string; 
    placeOfPayment: string; 
    checkNum: any;

}

