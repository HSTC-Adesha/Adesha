import * as mongoose from 'mongoose';

export const bankSchema = new mongoose.Schema ({
    name: {type: String},
    city: {type: String},
    address: {type: String},
    company:{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    comment: {type: String },
})

export class Bank extends mongoose.Document {
    id: string;
    name: string;
    city: string;
    address: string;
    company: string;
    comment: string
}

