import *as mongoose from 'mongoose';

export const companySchema = new mongoose.Schema ({
    name: {type: String},
    cityOrCountry:{type: String },
    address: {type: String},
    type: {type:String},
    employees:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
    bills:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Bill' }],
    comment: {type: String }, 
})

export class Company extends mongoose.Document {
    id: string;
    name: string;
    cityOrCountry: string;
    address: string;
    type: string;
    employees:[string];
    bills: [string];
    comment: string;
}

