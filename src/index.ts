const http = require('http')
const dotenv = require('dotenv')
const express = require("express");
import { Express, Request, Response, NextFunction} from 'express';
import userRouter from './routes/userRouter';
import bodyParser from 'body-parser';
dotenv.config();

const app:Express = express();

const port = process.env.PORT || 3000;

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.use((req:Request, res:Response, next:NextFunction)=>{
    res.send("HEllossa")
})

app.listen(port, ()=>{
    console.log(`Server is running on the port ${port}.`)
})
