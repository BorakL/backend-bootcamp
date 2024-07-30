// const http = require('http')
// const dotenv = require('dotenv')
// const express = require("express");
// import { Express, Request, Response, NextFunction} from 'express'; 
// import bodyParser from 'body-parser';
// dotenv.config();

// const app:Express = express();

// const port = process.env.PORT || 3000;

// app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/api/users", userRouter);

// app.use((req:Request, res:Response, next:NextFunction)=>{
//     res.send("HEllossa")
// })

// app.listen(port, ()=>{
//     console.log(`Server is running on the port ${port}.`)
// })


import express, { NextFunction, Request, Response, Express, ErrorRequestHandler} from 'express' 
import dotenv from 'dotenv'
import gameRouter from './routes/gameRouter';
import genreRouter from './routes/genreRouter';
import mongoose from 'mongoose';

dotenv.config();

const app:Express = express();

app.use(express.json())

app.use("/api/v1/games",gameRouter)
app.use("/api/v1/genres",genreRouter) 

app.use((err:any, req:Request, res:Response, next:NextFunction)=>{
    res.status(404).json({
        status:'fail123',
        message: err
    })
})

const connectDB = async()=>{
    try{
        const uri = process.env.MONGO_URI;
        if(!uri){
            throw new Error("MONGO_URI is not defined in the environment variables")
        }
        const conn = await mongoose.connect(uri);
        console.log("Database connected successfully: ", conn.connection.host)
    }catch(error){
        console.error(error)
        process.exit(1)
    }
}

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    connectDB();
    console.log(`Server is running on the port ${port}`)
})