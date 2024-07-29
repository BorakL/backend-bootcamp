import mongoose, { Schema } from "mongoose";
import { IGame } from "../types/models";
import { timeStamp } from "console";
 
const gameSchema: Schema<IGame> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Game name is required!']
    },
    genre: {
        type: mongoose.Schema.ObjectId,
        
    },
    publisher: {
        type: String,
        required: [true, 'Brand name is required']
    },
    shortDescription: {
        type: String,
        required: [true, 'Short description is required'] 
    },
    longDescription: {
        type: String,
        required: false
    },
    releaseDate: Date,
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    discount: {
        type: Number,
        default: 0
    }
}, 
{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
}
)

gameSchema.virtual("onDiscount").get(function(){
    return this.discount > 0 
})

const Game = mongoose.model<IGame>('Game', gameSchema)

export default Game;