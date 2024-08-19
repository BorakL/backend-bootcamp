const dotenv = require('dotenv')
const express = require("express");
import { Express, Request, Response, NextFunction} from 'express';
import userRouter from './routes/userRouter';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'; 
import User from './models/userModel';
import Post from './models/postModel';
import fs from 'fs.promises'
import { cwd } from 'process';

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
 
// User.create() 

// fs.readFile(`${cwd()}/data/newUsers.json`, "utf-8", (error,data) => {
//     if(!error){
//         User.create(JSON.parse(data)).then((data)=>{
//             console.log("new users added",data)
//         })
//     }else{
//         console.error(error.message)
//     }
// })

const addNewUsers = async ()=>{
    try{
        const loadedData = await fs.readFile(`${cwd()}/data/newUsers.json`,"utf-8");
        const data = JSON.parse(loadedData)
        await User.create(data)
    }catch(error){
        console.log(error)
    }
    
}
// addNewUsers()
 

const findUsers = async()=>{
    try{
        const users = await User.find({email:{$regex:/(example.com)$/}})
        console.log("users",users)
    }catch(error){
        console.log(error)
    }
}

// console.log(findUsers())

const updateUserEmail = async()=>{
    try{
        await User.findOneAndUpdate({firstName:"Alice"},{$set:{email:"alice.new@example.com"}})
    }catch(error){
        console.log(error)
    }
}

// updateUserEmail()

const incrementPostCound = async()=>{
    try{
        await User.findOneAndUpdate({lastName:'Smith'}, {postCount:{$inc:1}})
    }catch(error){
        console.log(error)
    }
}

// incrementPostCound()

type Post = {
    text: String;
    user: String;
    title: String
}

const createPosts = async(posts:Post[])=>{
    try{
        await Post.create(posts)
    }catch(error){
        console.log(error)
    }
}

// createPosts([
//     {title:"My comment", text:"Here is my comment", user:"66c1de7f81d18a77384757c6"},
//     {title:"My comment", text:"Object literal may only specify", user:"66c1df369251a4cb99e59d88"},
//     {title:"My comment", text:"asdfyxcv asdf", user:"66c1de7f81d18a77384757c6"}
// ])

const findUsers2 = async()=>{
    try{
        const user = await User.findOne({ lastName: 'JOHNSON' });
        console.log("user",user)
    }catch(error){
        console.log(error)
    }
}
// findUsers2();

User.find({firstName:"Charlie"}).then(res=>console.log("resssssss",res))