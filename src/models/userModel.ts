import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/models";

const userSchema:Schema<IUser> = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true,'Name is required!']
        },
        email: {
            type: String,
            required: [true, 'Email is required!']
        },
        image: {
            type: String
        }
    },{
        timestamps: true
    }
)

const User = mongoose.model<IUser>("User", userSchema)

export default User;