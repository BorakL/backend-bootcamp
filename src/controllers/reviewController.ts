import { NextFunction, Request, Response } from "express";
import { reviewModel } from "../models/reviewModel";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./handlerFactory";

export const setGameUser = (req:Request, res:Response, next: NextFunction):void => {
    console.log("gameId",req.params.gameId)
    console.log("user",req.params.userId)
    if(!req.body.game) req.body.game = req.params.gameId;
    // if(!req.body.user ) req.body.user = req.user.id;
    next();
}
export const getAllReviews = getAll(reviewModel);
export const getOneReview = getOne(reviewModel);
export const createReview = createOne(reviewModel);
export const updateReview = updateOne(reviewModel);
export const deleteReview = deleteOne(reviewModel);