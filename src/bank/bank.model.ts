import * as mongoose from 'mongoose';

export const bankSchema = new mongoose.Schema ({
    name: {type: String},
    city: {type: String},
    address: {type: String},
    company:{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    bankAccounts:[{ type: mongoose.Schema.Types.ObjectId, ref: 'bankaccount' }],
    comment: {type: String },
})

export class Bank extends mongoose.Document {
    id: string;
    name: string;
    city: string;
    address: string;
    company: string;
    bankAccounts: [string];
    comment: string
}

