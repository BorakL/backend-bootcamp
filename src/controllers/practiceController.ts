import { Request, Response, NextFunction } from "express";
import session from 'express-session';

export const getExample = (req:Request, res:Response, next:NextFunction) => {
    console.log("req.cookie", req.session)
    res.send("Hello")
}