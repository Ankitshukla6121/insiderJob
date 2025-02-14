import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    _id:{type:String, required:true},
    name:{type:String, required:true},
    email:{type:String, requird:true,unique:true},
    resume:{type:String},
    image:{type:String, requird:true}
})

const User= mongoose.model('User', userSchema);

export default User;
