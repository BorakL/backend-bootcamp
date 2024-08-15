import mongoose from "mongoose";
import { IUser } from "../types/userType";

const userSchema = new mongoose.Schema<IUser>({
    firstName: {
        type: String,
        required: [true, "The first name is required field"]
    },
    lastName: {
        type: String,
        required: [true, "The last name is required field"]
    },
    email: {
        type: String,
        required: [true, "The email is required field"],
        validate: {
            validator: function(v){
                const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return v.match(emailReg)
            },
            message: props => `${props} is not valid email!`
        }
    }
},{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
})

userSchema.virtual("fullName").get(function(){
    return `${this.firstName} ${this.lastName}`
})

const User = mongoose.model<IUser>("User",userSchema);

export default User;