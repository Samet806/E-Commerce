import mongoose from "mongoose";

const dbConnect=()=>{
    try{
        mongoose.connect(process.env.MONGODb_URL)
       console.log("database connected")
    }catch(err)
    {
     console.log("database error")
    }
}

export default dbConnect