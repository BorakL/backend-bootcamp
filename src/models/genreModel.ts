import mongoose, { Schema } from "mongoose";
import { IGenre } from "../types/models";

const genreSchema:Schema<IGenre> = new mongoose.Schema({
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