import mongoose from "mongoose";

const collection = "users"

const schema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    password:String,
    role:String,
    provider:String,
    cart: mongoose.SchemaTypes.ObjectId
})


const model = mongoose.model(collection,schema)


export {model as userModel}