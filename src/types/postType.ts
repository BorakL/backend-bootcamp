import { PopulatedDoc } from "mongoose";
import { IUser } from "./userType";

interface IPost extends Document {
    id: string,
    title: string,
    text: string,
    timestamps: Date,
    user: PopulatedDoc<IUser>
}

export default IPost;