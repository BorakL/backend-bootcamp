import mongoose, { Schema, Types } from "mongoose";
import { IUser } from "../types/userType"; 
import IPost from "../types/postType";

export const userSchema = new mongoose.Schema<IUser>({
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
        validate: 
            [
                {
                    validator: function(v){
                        const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return v.match(emailReg)
                    },
                    message: props => `${props} is not valid email!`
                },
                {
                    validator: function(){
                        const domain = this.email.match(/(?<=\@).*$/);
                        if(domain!==null){
                            return ["gmail.com","example.com"].some(d => d===domain[0])
                        }
                        return false
                    },
                    message: props => `${props} is not valid email! The domain is not allowed.`
                }
            ]
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
})

userSchema.post('save', function(doc,next){
    console.log(`Welcome user ${doc.fullName}`)
    next()
}) 
userSchema.pre('save', function(next){
    if(this.email !== this.email.toLocaleLowerCase()){
        this.email = this.email.toLocaleLowerCase()
    }
    next()
})

userSchema.pre("findOne", function(next){
    this.populate("posts");
    const formatName = (name:string)=>{
        return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()
    }
    if (this.getQuery().lastName) {
        this.setQuery({ lastName: formatName(this.getQuery().lastName) });
    }
    next();
});

userSchema.pre(/^find/,function(this: mongoose.Query<IUser[], IUser>, next){
    this.where({isDeleted: {$ne:true}})
    next();
})

userSchema.methods.getInitials = function(){
    return `${this.firstName[0]} ${this.lastName[0]}`
}
userSchema.methods.softDelete = function(){ 
    this.isDeleted = true;
    return this.save()
}

userSchema.virtual("fullName").get(function(){
    return `${this.firstName} ${this.lastName}`
})

userSchema.virtual("emailDomain").get(function(){
    const domain = this.email.match(/(?<=\@).*$/);
    return  domain ? domain : "unknown"
})

 
const User = mongoose.model<IUser>("User",userSchema);

export default User;