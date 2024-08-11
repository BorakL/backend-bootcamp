import { NextFunction, Request, RequestHandler, Response } from "express"; 
import { Model } from "mongoose";
import catchAsync from "../utilities/catchAsync";
import APIFeatures from "../utilities/apiFeatures";

export const getAll = (model:Model<any>): RequestHandler =>  
    catchAsync(async(req:Request, res:Response, next:NextFunction) => {
        console.log("llreq.body",req.body)
        const features = new APIFeatures(model.find(req.body), req.query).filter().sort().limitFields().paginate();
        const data = await features.queryResult;
        res.status(200).json({
            status:'success',
            data
        })
    })

export const getOne = (model: Model<any>): RequestHandler => 
    catchAsync(async(req:Request, res:Response, next:NextFunction) => {
        const data = await model.findById(req.params.id);
            res.status(200).json({
                status:"success",
                data
            })
    })

export const updateOne = (model:Model<any>): RequestHandler =>
    catchAsync(async(req:Request, res:Response, next:NextFunction) => {
        const doc = await model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(201).json({
            status:"success",
            data: doc
        })
    })

export const createOne = (model:Model<any>): RequestHandler =>
    catchAsync(async(req:Request, res:Response, next:NextFunction) => {
        const doc = await model.create(req.body);
        res.status(201).json({
            status:"success",
            data:doc
        })
    })
     

export const deleteOne = (model:Model<any>): RequestHandler =>
    catchAsync(async(req:Request, res:Response, next:NextFunction) => {
        await model.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
        })
    })