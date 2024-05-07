import mongoose from "mongoose";

export const vaidateMongoDbId=(id=>{
    const isValid=mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new Error("this is is not valid or not found")
})