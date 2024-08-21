import mongoose from "mongoose"; 

interface IPerson  {
    gender: ["male"|"female"];
    name: {title: ["mr"|"miss"], first:string, last:string};
    location: {
        street:string, 
        city:string,
        state:string,
        postcode: number,
        coordinates: {latitude:string, longitude:string},
        timezone:{ 
            offset: string,
            description: string 
        }
    },
    email: string,
    login: {
        uuid: string
        username: string,
        password: string,
        salt: string,
        md5: string,
        sha1: string,
        sha256: string
    },
    dob: {
        date: string,
        age: number
    },
    registered: {
        date: string,
        age: number
    },
    phone: string,
    cell: string, 
    picture:{
        large: string,
        medium: string,
        thumbnail: string
    },
    nat: string
}

const personSchema = new mongoose.Schema<IPerson>({
    gender: String,
    name: {
        title: String,
        first: String,
        last: String
    },
    location: {
        street: String,
        city: String,
        state: String,
        postcode:Number,
        coordinates:{
            latitude: String,
            longitude: String
        },
        timezone:{ 
            offset: String,
            description: String 
        }
    },
    email: String,
    login:{
        uuid: String,
        username:String,
        password:String, 
        salt:String,
        md5:String,
        sha1:String,
        sha256:String,        
     },
    dob:{
        date: String,
        age: Number
    },
    registered:{ 
        date: String,
        age: Number
    },
    phone:String,
    cell:String, 
    picture:{ 
        large: String,
        medium: String,
        thumbnail: String 
    },
    nat: String
},{ 
    toJSON: {virtuals:true},
    toObject: {virtuals:true}   
})

const personNoSchema = new mongoose.Schema({}, {strict:false})

const Person = mongoose.model("Person", personNoSchema)

export default Person;