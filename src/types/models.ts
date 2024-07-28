import exp from "constants";
import mongoose, { Document } from "mongoose";

export interface IGame extends Document{
    name: string,
    genre: mongoose.Types.ObjectId,
    publisher: string,
    shortDescription: string,
    longDescription: string,
    releaseDate: Date,
    price: number,
    onDiscount: boolean,
    discount: number
}

export interface IGenre extends Document {
    name: string
}

export interface IUser extends Document {
    name: string,
    email: string,
    image: string
}