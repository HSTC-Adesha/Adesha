import *as mongoose from 'mongoose';

export const bankAccountSchema = new mongoose.Schema ({
    number: {type: String},

})

export class BankAccount extends mongoose.Document {
    number: string;
}

