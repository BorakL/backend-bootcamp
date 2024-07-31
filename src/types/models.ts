import mongoose, { Document, PopulatedDoc } from "mongoose";

export interface IGame extends Document{
    _id: mongoose.Types.ObjectId,
    name: string,
    genre: mongoose.Types.ObjectId,
    // genre: PopulatedDoc<IGenre>
    publisher: string,
    shortDescription: string,
    longDescription: string,
    releaseDate: Date,
    price: number,
    onDiscount: boolean,
    discount: number
}

export interface IGenre extends Document {
    _id: mongoose.Types.ObjectId,
    name: string
}

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId,
    name: string,
    email: string,
    image: string
}

export interface IOrder extends Document {
    _id: mongoose.Types.ObjectId,
    user: mongoose.Types.ObjectId,
    game: mongoose.Types.ObjectId,
    date: Date,
    quantity: number
}