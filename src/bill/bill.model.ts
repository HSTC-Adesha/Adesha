import * as mongoose from 'mongoose';

export const billSchema = new mongoose.Schema ({
    number: {type: String},
    comment: {type: String, required:false },
    cheque:{ type: mongoose.Schema.Types.ObjectId, ref: 'Cheque' },
    company:{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
})

export class Bill extends mongoose.Document {
    id: string;
    number: string;
    cheque: string;
    company: string;
    comment: string

}

