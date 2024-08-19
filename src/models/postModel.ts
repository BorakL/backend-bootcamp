import mongoose, { Schema } from "mongoose";
import IPost from "../types/postType";

export const postSchema = new mongoose.Schema<IPost>({
    title: {
        type: String,
        required: [true, "The title is required field"]
    },
    text: {
        type: String,
        required: [true, "The text is required field"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
})

const Post = mongoose.model<IPost>("Post", postSchema)

export default Post;