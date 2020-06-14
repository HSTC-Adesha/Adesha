import *as mongoose from 'mongoose';

export const employeeSchema = new mongoose.Schema ({
    firstName: {type: String},
    lastName:{type: String, required:true },
    role: {type: String, required:true },
    comment: {type: String, required:true }, 
})

export class Employee extends mongoose.Document {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    role: string;
    comment: string;

}

