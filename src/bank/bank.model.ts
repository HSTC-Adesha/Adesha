import * as mongoose from 'mongoose';

export const bankSchema = new mongoose.Schema ({
    name: {type: String},
    comment: {type: String },
})

export class Bank extends mongoose.Document {
    id: string;
    name: string;
    comment: string

}

