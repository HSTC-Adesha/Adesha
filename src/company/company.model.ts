import *as mongoose from 'mongoose';

export const companySchema = new mongoose.Schema ({
    name: {type: String},
    cityOrCountry:{type: String },
    address: {type: String},
    type: {type:String},
    comment: {type: String }, 
    employees:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
    bankAccounts:[{ type: mongoose.Schema.Types.ObjectId, ref: 'BankAccount' }],
    banks:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Bank' }],
    bills:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Bank' }],

})

export class Company extends mongoose.Document {
    id: string;
    name: string;
    cityOrCountry: string;
    address: string;
    type: string;
    employees:[string];
    bankAccounts:[string];
    banks:[string];
    bills: [string];
    comment: string;

}

