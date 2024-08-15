const dotenv = require('dotenv')
const express = require("express");
import { Express, Request, Response, NextFunction} from 'express';
import userRouter from './routes/userRouter';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'; 
import User from './models/userModel';
dotenv.config();

const app:Express = express();

const port = process.env.PORT || 3000;

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.use((req:Request, res:Response, next:NextFunction)=>{
    res.send("HEllossa")
})

const db = process.env.DATABASE || '';
mongoose.connect(db).then(()=>{
    console.log("database conenction succesful")
})

app.listen(port, ()=>{
    console.log(`Server is running on the port ${port}.`)
})
 

const user1 = new User({firstName:'John', lastName:'Doe',email:'john.doe@example.com'})
// console.log("user1",user1)
// user1.save();

const addUser = async()=>{
    await User.create({firstName: 'Julian', lastName:'Doe', email:'Julian@asdf.com'})
}
// addUser();
 
