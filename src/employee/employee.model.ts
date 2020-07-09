import *as mongoose from 'mongoose';

export const employeeSchema = new mongoose.Schema ({
    firstName: {type: String},
    lastName:{type: String, required:true },
    role: {type: String, required:true },
    employees:{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    bankAccounts:[{ type: mongoose.Schema.Types.ObjectId, ref: 'bankaccount' }],
    cheques:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Cheque' }],
    comment: {type: String, required:true }, 
})

export class Employee extends mongoose.Document {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    role: string;
    company: string;
    bankAccounts: [string];
    cheques: [string];
    comment: string;

}

