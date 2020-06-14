import *as mongoose from 'mongoose';

export const chequeBookSchema = new mongoose.Schema ({
    number: {type: String},
    numberOfCheques:{type: String},
    comment: {type: String, required:false },
})

export class ChequeBook extends mongoose.Document {
    id: string;
    number: string;
    numberOfCheques: string;
    comment: string
}

