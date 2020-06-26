import * as mongoose from 'mongoose';


export const chequeSchema = new mongoose.Schema ({
    number: {type: String},
    billNumber: {type: String},
    amount: {type: String},
    dueDate: {type: String},
    creationDate: {type: String},
    placeOfCreation: {type: String},
    comment: {type: String, required:false },
})

export class Cheque extends mongoose.Document {
    id: string;
    number: string;
    billNumber: string;
    amount: string;
    dueDate: string;
    creationDate: string;
    placeOfCreation: string;
    comment: string
}

