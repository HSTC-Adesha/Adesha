import * as mongoose from 'mongoose';

export const chequeBookSchema = new mongoose.Schema ({
    number: {type: String},
    cheques:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Cheque' }],
    bank:{ type: mongoose.Schema.Types.ObjectId, ref: 'Bank' },
    company:{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    delivredTo:{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
})

export class ChequeBook extends mongoose.Document {
    id: string;
    number: string;
    cheques: [string];
    bank: string;
    delivredTo: string;
    company:string;
}

