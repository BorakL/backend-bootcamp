import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Genre is required"]
    }
})

const Genre = mongoose.model('Genre', genreSchema)

export default Genre;