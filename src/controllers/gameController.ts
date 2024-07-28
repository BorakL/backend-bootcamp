import { Request, Response } from "express"
import Game from "../models/gameModel"

export const getAllGames = async(req: Request, res:Response) => {
    try{
        const games = await Game.find()
        console.log("games",games)
        res.status(200).json({
            status:'success',
            data:games
        })
    }catch(error){
        res.status(404).json({
            status:'fail',
            message:error
        })
    }
}

export const getGame = async(req:Request, res:Response)=>{
    try{
        const id = req.params.gameId
        const game = await Game.findById(id)
        res.status(200).json({
            status:'success',
            data:game
        })
    }catch(error){
        res.send(404).json({
            status:'fail',
            message:error
        })
    }
}

export const createGame = async(req:Request, res:Response)=>{
    try{
        const newGame = await Game.create(req.body);
        res.status(200).json({
            status:'success',
            data: newGame
        })
    }catch(error){
        res.status(404).json({
            status:'fail',
            message: error
        })
    }
}