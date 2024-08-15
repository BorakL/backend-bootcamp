import { Types } from "mongoose";

export interface IUser extends Document {
    id:string;
    firstName: string;
    lastName: string;
    email: string;
    fullName: string; 
    post: Types.ObjectId[]
}