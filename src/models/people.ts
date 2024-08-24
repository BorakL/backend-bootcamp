import mongoose from "mongoose";

const personSchema = new mongoose.Schema({},{strict:false});

const People = mongoose.model("People",personSchema);

export default People;