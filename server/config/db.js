import mongoose from "mongoose";

//connection to mongodb database

const connectDB = async () =>{

    mongoose.connection.on('connected',()=> console.log('Database is connected'))

    await mongoose.connect(`${process.env.MONGO_URL}/job-portal`)
}

export  default connectDB