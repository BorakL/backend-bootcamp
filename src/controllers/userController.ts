import { NextFunction, Request, Response } from "express";
import { addItem, getItem, removeItem, updateItem } from "../utilities/services";

const fs = require('fs');

const path = `${process.cwd()}/data/users.json`;
const loadedData = fs.readFileSync(path,"utf-8");
const data = JSON.parse(loadedData) 

export const getAllUsers = (req:Request, res:Response, next:NextFunction) => {
    if(!data || data.length===0){
        res.status(404).json({
            error: "Data empty"
        })
    }else{
        res.status(200).json({
            data
        })
    }
}
 
export const getUserById = (req:Request, res:Response, next:NextFunction)=>{ 
    const userId = req.params.userId;
    const user = getItem(data, userId);
    if(!user){
        res.status(400).json({
            data: "There is no user with that id"
        })
    }else{
        res.status(200).json({
            data: user
        })
    }
}

export const addUser = async (req:Request, res:Response, next: NextFunction) => {
    try{
        await addItem(data, req.body);
        res.status(200).json({
            data: req.body
        })
    }catch(error){
        res.status(404).json({
            error: error
        })
    }
}

export const updateUser = async (req:Request, res:Response, next: NextFunction) => {
    try{
        let userId = req.params.userId;
        await updateItem(userId, data, req.body);
        res.status(200).json({
            data: req.body
        })
    }catch(error){
        res.status(400).json({
            error: error
        })
    }
}

export const deleteUser = async(req:Request, res:Response, next: NextFunction) => {
    try{
        const id = req.params.userId;
        await removeItem(id, data)        
        res.sendStatus(200)
    }catch(error){
        res.status(400).json({
            error: error
        })
    }
}