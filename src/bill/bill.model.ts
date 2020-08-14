import * as mongoose from 'mongoose';

export const billSchema = new mongoose.Schema ({
    number: {type: String},
    ammount :{type: String},
    company:{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    comment: {type: String, required:false },
})

export class Bill extends mongoose.Document {
    id: string;
    number: string;
    ammount: string;
    company: string;
    comment: string

}

