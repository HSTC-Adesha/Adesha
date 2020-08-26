import * as mongoose from 'mongoose';


export const chequeSchema = new mongoose.Schema ({
    number: {type: String},
    amount: {type: String},
    received:{type:Boolean},
    status: {type: String},
    dueDate: {type: String},
    creationDate: {type: String},
    photo: {type: String},
    bank:{ type: mongoose.Schema.Types.ObjectId, ref: 'Bank' },
    company:{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    delivredTo:{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    chequeBook:{ type: mongoose.Schema.Types.ObjectId, ref: 'ChequeBook' },
    bills:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Bill' }],
    comment: {type: String, required:false },
})

export class Cheque extends mongoose.Document {
    id: string;
    number: string;
    amount: string;
    received:boolean;
    status:string;
    dueDate: string;
    creationDate: string;
    photo: string;
    bank: string;
    company: string;
    delivredTo: string;
    chequeBook: string;
    bills: [string];
    comment: string
}

