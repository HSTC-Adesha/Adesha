import *as mongoose from 'mongoose';

export const employeeSchema = new mongoose.Schema ({
    firstName: {type: String, required:true},
    lastName:{type: String, required:true },
    role: {type: String, required:true },
    company:{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    comment: {type: String, required: false }, 
})

export class Employee extends mongoose.Document {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    company:string;
    comment: string;
}

