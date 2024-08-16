import { PopulatedDoc, Types } from "mongoose";
import IPost from "./postType"; 
export interface IUser extends Document {
    id:string;
    firstName: string;
    lastName: string;
    email: string;
    fullName: string; 
    posts?: [PopulatedDoc<IPost>];
    getInitials: ()=>string;
    emailDomain: string;
}