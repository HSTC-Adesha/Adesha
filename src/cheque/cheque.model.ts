
import *as mongoose from 'mongoose';

export const chequeSchema = new mongoose.Schema ({
    chequeNum: {type: String},
    billNum:{type: String, required:true },
    chequebookNum: {type: String, required:true },
    bankName: {type: String, required:true },
    dueDate: {type: String, required:true },
    creationDate: {type: String, required:true },
    amountToBePaid: {type:String, required:true },
    emittedCheque: {type: String, required:true },
    personTransmitterOfCheque: {type: String, required:true },
    chequeDestination: {type: String, required:true },
    personReceiverOfCheque: {type: String, required:true },
    placeOfCreation: {type: String, required:true },
    placeOfPayment: {type: String, required:true },

})

export class Cheque extends mongoose.Document {
    id: string;
    chequeNum: string;
    billNum: string;
    chequebookNum: string;
    bankName: string;
    dueDate: string;
    creationDate: string;
    amountToBePaid: string;
    emittedCheque: string;
    personTransmitterOfCheque: string;
    chequeDestination: string;
    personReceiverOfCheque: string;
    placeOfCreation: string;
    placeOfPayment: string;


}

