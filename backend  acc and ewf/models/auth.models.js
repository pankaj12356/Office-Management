import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:['employee','admin'],
        default:"employee"
    },
    password:{
        type:String,
        required:true
    },
    profileImage: {
        type:String,
        
        
    }
},{timestamps:true})




export const User = mongoose.model('User',UserSchema)

export default User;