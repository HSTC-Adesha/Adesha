import { Document } from 'mongoose';

export interface ForgotPassword extends Document {
    [x: string]: any;
    email: string;
    verification: string;
    firstUsed: boolean;
    finalUsed: boolean;
    expires: Date;
    browser:string;
    country:string;
    ip:string;
    ipRequest: string;
    browserRequest: string;
    countryRequest: string;
    ipChanged: string;
    browserChanged: string;
    countryChanged: string;
}
