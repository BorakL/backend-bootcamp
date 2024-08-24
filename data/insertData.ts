import mongoose from "mongoose"
import { config } from "dotenv";
import { promises as fs } from 'fs'; 
import People from '../src/models/people'
config({ path: '../.env' })

const dbConnection = async()=>{ 
    const db = process.env.DATABASE || "" 
    mongoose.connect(db).then(res=>console.log("database succesfully connected"))
}

dbConnection();

const writeData = async()=>{
    const data = await fs.readFile("./people.json", "utf-8")
    console.log("data",data)
    await People.create(JSON.parse(data))
}

// writeData();