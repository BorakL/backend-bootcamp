import { NextFunction, Request, Response } from "express"; 
import { Model } from "mongoose";

export const getAll = (model:Model<any>) => {
    async(req:Request, res:Response, next:NextFunction) => {
        try{
            const data = await model.find();
            res.status(200).json({
                status: "success",
                data
            })
        }catch(error){
            res.status(404).json({
                status: "fail",
                message: error
            })
        }
    }
}

export const getOneById = (model: Model<any>) => {
    async(req:Request, res:Response, next:NextFunction) => {
        try{
            const data = await model.findById(req.params.id);
            res.status(200).json({
                status:"success",
                data
            })
        }catch(error){
            res.status(404).json({
                status: "fail",
                message: error
            })
        }
    }
}

export const updateOne = (model:Model<any>) => {

    async (req:Request, res:Response, next:NextFunction) => {
        try{
            const doc = await model.findByIdAndUpdate(req.params.id)
            res.status(201).json({
                status:"success",
                data: doc
            })
        }catch(error){
            res.status(404).json({
                status:'fail',
                message: error
            })
        }
    } 
}

export const createOne = (model:Model<any>) => {
    async (req:Request, res:Response, next:NextFunction) => {
        try{
            const doc = await model.create(req.body);
            res.status(201).json({
                status:"success",
                data:doc
            })
        }catch(error){
            res.status(404).json({
                statsus:'fail',
                message:error
            })
        }
    }
}

export const deleteOne = (model:Model<any>) => {
    async(req:Request, res:Response, next:NextFunction)=>{
        try{
            await model.findByIdAndDelete(req.params.id)
            res.status(204).json({
                status: 'success',
            })
        }catch(error){
            res.status(404).json({
                status:'fail',
                message:error
            })
        }
    }
}