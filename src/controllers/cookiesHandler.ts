import { NextFunction, Request, Response } from "express";

export const setCookie = (req:Request, res:Response, next:NextFunction) => {
    res.cookie('name','Pera',{maxAge:9000, signed:true});
    res.send('cookie has been set')
}

export const getCookie = (req:Request, res:Response, next:NextFunction) => {
    console.log("req.headers",req.signedCookies.name)
    res.send('cookie')
}
 