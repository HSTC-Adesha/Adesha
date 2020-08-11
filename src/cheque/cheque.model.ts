import * as mongoose from 'mongoose';


export const chequeSchema = new mongoose.Schema ({
    number: {type: String},
    amount: {type: String},
    dueDate: {type: String},
    creationDate: {type: String},
    placeOfCreation: {type: String},
    bank:{ type: mongoose.Schema.Types.ObjectId, ref: 'Bank' },
    company:{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    delivredTo:{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },


    
    chequeBook:{ type: mongoose.Schema.Types.ObjectId, ref: 'ChequeBook' },
    bankAccount:{ type: mongoose.Schema.Types.ObjectId, ref: 'BankAccount' },
    bills:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Bill' }],
    comment: {type: String, required:false },
})

export class Cheque extends mongoose.Document {
    id: string;
    number: string;
    amount: string;
    dueDate: string;
    creationDate: string;
    placeOfCreation: string;
    bank: string;
    company: string;
    delivredTo: string;
    chequeBook: string;
    bankAccount: string;
    bills: [string];
    comment: string
}

