import mongoose, { Schema } from "mongoose";
import { IGame } from "../types/models";

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
    onDiscount: {
        type: Boolean,
        default: false
    },
    discount: {
        type: Number,
        default: 0,
        validate: {
            validator: function(value){
                if((!this.onDiscount && value!==0) || (this.onDiscount && value===0)){
                    return false
                }
                return true;
            },
            message: "Error"
        }
    }
})

const Game = mongoose.model<IGame>('Game', gameSchema)

export default Game;