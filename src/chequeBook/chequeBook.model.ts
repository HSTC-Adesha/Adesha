import * as mongoose from 'mongoose';

export const chequeBookSchema = new mongoose.Schema ({
    number: {type: String},
    bank:{ type: mongoose.Schema.Types.ObjectId, ref: 'Bank' },
    company:{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
})

export class ChequeBook extends mongoose.Document {
    id: string;
    number: string;
    bank: string;
    company:string;
}

