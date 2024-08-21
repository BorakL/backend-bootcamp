//import data
import dotenv from 'dotenv';
import mongoose from "mongoose" 
import Person from '../src/models/personModel'
import { readFile } from 'fs/promises';
import { cwd } from 'process';

// const fs = require('fs');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv'); 
// const Person = requrie('../src/models/personModel.ts');
// const readFile = require('fs/promises');
// const cwd = require('process')
dotenv.config();

const databaseConnection = ()=>{ 
        const db = process.env.DATABASE || '';
        console.log("database ",db)
        mongoose.connect(db)
            .then(res=>console.log("Database connection successfuly"))
            .catch(error=>console.log(error))
}

const importData = async()=> {
    try{
        const data = await readFile(`${cwd()}/data/persons.json`, "utf-8") 
        databaseConnection();
        await Person.create(JSON.parse(data))
        process.exit();
    }catch(error){
        console.log(error)
    }
}

importData()