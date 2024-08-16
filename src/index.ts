const dotenv = require('dotenv')
const express = require("express");
import { Express, Request, Response, NextFunction} from 'express';
import userRouter from './routes/userRouter';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'; 
import User from './models/userModel';
import Post from './models/postModel';
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
    await User.create({firstName: 'Marko', lastName:'Petrovic', email:'mare@gmail.com'})
}
// addUser();
 

const addPost = async()=>{
    await Post.create({title:"Naslov", text:"tralalaa"})
}
// addPost();

const updateUser = async()=>{
    await User.findByIdAndUpdate("66bcbc6cb1de0aca15064940",{posts:["66bf5076a5f3b8ac2ebed7b4"]})
}
// updateUser();

// const user = User.findById("66bcbc6cb1de0aca15064940").populate("posts").then(user=>console.log("user",user))
// User.findOne({_id:"66bcbc6cb1de0aca15064940"}).then(user => console.log("usersssss",user))
 
