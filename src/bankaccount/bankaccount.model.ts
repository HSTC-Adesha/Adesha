import *as mongoose from 'mongoose';

export const bankAccountSchema = new mongoose.Schema ({
    number: {type: String},
    bank:{ type: mongoose.Schema.Types.ObjectId, ref: 'Bank' },
    cheques:[{ type: mongoose.Schema.Types.ObjectId, ref: 'cheque' }],
    company:{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    employee:{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },

})

export class BankAccount extends mongoose.Document {
    number: string;
    bank: string;
    cheques: [string];
    company: string;
    employee: string
}

