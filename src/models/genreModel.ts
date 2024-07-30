import mongoose, { Schema } from "mongoose";
import { IGenre } from "../types/models";

const genreSchema:Schema<IGenre> = new mongoose.Schema<IGenre>({
    name: {
        type: String,
        required: [true, "Genre is required"]
    }
},
{
    timestamps: true
})

const Genre = mongoose.model<IGenre>('Genre', genreSchema)

export default Genre;