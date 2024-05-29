import Category from "../models/blogCatModel.js"
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

export const deleteCategory= asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
          const deleterdCategory= await Category.findByIdAndDelete(id);
          res.status(200).json("Başarıyla silindi");
           
    }catch(err)
    {
        throw new Error(err);
    }
})


export const getCategory= asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
          const getCategory= await Category.findById(id); 
          res.status(200).json(getCategory);
           
    }catch(err)
    {
        throw new Error(err);
    }
})

export const getAllCategory= asyncHandler(async(req,res)=>{
    try{
          const getAllCategory= await Category.find(); 
          res.status(200).json(getAllCategory);
           
    }catch(err)
    {
        throw new Error(err);
    }
})