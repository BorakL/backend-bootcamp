import mongoose, { Query, Schema } from "mongoose";
import { IGame } from "../types/models";
 
const gameSchema: Schema<IGame> = new mongoose.Schema<IGame>({
    name: {
        type: String,
        required: [true, 'Game name is required!']
    },
    genre: {
        type: mongoose.Schema.ObjectId,
        ref: 'Genre'
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

gameSchema.virtual('reviews',{
    ref:"Review",
    foreignField:"game",
    localField:"_id"
})

gameSchema.pre<Query<IGame,IGame>>(/^find/,function(next){
    this.populate({
        path:"genre",
        model:"Genre",
        select: 'name'
    }).populate({
        path:"reviews",
        model:"Review",
        select:{'review':1}
    })
    next()
})

const Game = mongoose.model<IGame>('Game', gameSchema)

export default Game;