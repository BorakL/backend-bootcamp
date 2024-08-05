import mongoose, { Query, Schema } from "mongoose";
import { IOrder } from "../types/models";

const orderSchema:Schema<IOrder> = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    game: {
        type: mongoose.Schema.ObjectId,
        ref:"game"
    },
    date: {
        type: Date,
        required: [true, "Date of order is required"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity of ordered items is required"],
        default: 1
    }
})

orderSchema.pre<Query<IOrder,IOrder>>(/^find/, function(next){
    this.populate({
        path:"user",
        select:"name"
    }).populate({
        path:"game",
        select:"name"
    });
    next();
})

const OrderModel = mongoose.model<IOrder>("Order", orderSchema)

export default OrderModel;