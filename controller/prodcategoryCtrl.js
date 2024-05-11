import Category from "../models/prodcategoryModel.js"
import asyncHandler from "express-async-handler"
import { validateMongoDbId } from "../utils/validateMongodbld.js";

export const createCategory= asyncHandler(async(req,res)=>{
    try{
          const category= await Category.create(req.body);
          res.status(200).json(category);
           
    }catch(err)
    {
        throw new Error(err);
    }
})

export const updateCategory= asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
          const updatedCategory= await Category.findByIdAndUpdate(id, req.body, {new:true})
          res.status(200).json(updatedCategory);
           
    }catch(err)
    {
        throw new Error(err);
    }
})