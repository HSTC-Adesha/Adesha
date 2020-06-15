import *as mongoose from 'mongoose';

export const bankSchema = new mongoose.Schema ({
    name: {type: String},
    city: {type: String},
    address: {type: String},
    comment: {type: String, required:false },
})

export class Bank extends mongoose.Document {
    id: string;
    name: string;
    city: String;
    address: String;
    comment: string
}

