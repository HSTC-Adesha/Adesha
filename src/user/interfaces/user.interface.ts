import { Document } from 'mongoose';

export interface User extends Document {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    roles: [string];
    verification: string;
    verified: boolean;
    verificationExpires: Date;
    loginAttempts?: number;
    blockExpires?: Date;

}
