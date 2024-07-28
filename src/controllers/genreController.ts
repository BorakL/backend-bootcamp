import { Request, Response } from "express";
import Genre from "../models/genreModel";

export const getAllGenres = async (req:Request, res:Response) => {
    try{
        const genres = await Genre.find();
        res.status(200).json({
            status:"success",
            data:genres
        })
    }catch(error){
        res.status(404).json({
            status:"Fail",
            message:error
        })
    }
}

export const getGenre = async (req:Request, res:Response) => {
    try{
        const id = req.params.genreId
        const genre = await Genre.findById(id)
        res.status(200).json({
            status:"Success",
            data:genre
        })
    }catch(error){
        res.status(404).json({
            status:'fail',
            message:error
        })
    }
}

export const createGenre = async (req:Request, res:Response) => {
    try{
        const newGenre = await Genre.create(req.body);
        res.status(201).json({
            status: "Success",
            data: newGenre
        })
    }catch(error){
        res.status(404).json({
            status:'fail',
            message:error
        })
    }
}