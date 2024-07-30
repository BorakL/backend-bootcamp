import { NextFunction, Request, Response } from "express"; 
import { AsyncRequestHandler } from "../types/interfaces";

const catchAsync = (fn: AsyncRequestHandler) =>
    (req: Request ,res: Response, next:NextFunction) => { fn(req,res,next).catch(next) }

export default catchAsync;