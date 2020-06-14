import *as mongoose from 'mongoose';

export const billSchema = new mongoose.Schema ({
    number: {type: String},
    comment: {type: String, required:false },
})

export class Bill extends mongoose.Document {
    id: string;
    number: string;
    comment: string
}

