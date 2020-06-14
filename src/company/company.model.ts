import *as mongoose from 'mongoose';

export const companySchema = new mongoose.Schema ({
    name: {type: String},
    countryAndCity:{type: String, required:true },
    address: {type: String, required:true },
    type: {type:String, required:true },
    comment: {type: String, required:true }, 
})

export class Company extends mongoose.Document {
    id: string;
    name: string;
    countryAndCity: string;
    address: string;
    type: string;
    comment: string;

}

