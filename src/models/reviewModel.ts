import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, "Review is required"]
    },
    rating: {
        type: Number,
        min: [1, "Rating cannot be less than 1"],
        max: [5, "Rating cannot be more than 5"]
    },
    game: {
        type: mongoose.Schema.ObjectId,
        ref: 'Game',
        required: [true, 'Review must belong to a game']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user']
    }
},{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
})

export const reviewModel = mongoose.model("Review", reviewSchema)