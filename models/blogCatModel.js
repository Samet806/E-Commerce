import mongoose from "mongoose"; 


var blogcategorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },

},{timestamps:true});
 
export default mongoose.model('BCategory', blogcategorySchema);