import Brand from "../models/brandModel.js"
import asyncHandler from "express-async-handler"
import { validateMongoDbId } from "../utils/validateMongodbld.js";

export const createBrand= asyncHandler(async(req,res)=>{
    try{
          const brand= await Brand.create(req.body);
          res.status(200).json(brand);
           
    }catch(err)
    {
        throw new Error(err);
    }
})

export const updateBrand= asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
          const updatedBrand= await Brand.findByIdAndUpdate(id, req.body, {new:true})
          res.status(200).json(updatedBrand);
           
    }catch(err)
    {
        throw new Error(err);
    }
})

export const deleteBrand= asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
          const deleterdBrand= await Brand.findByIdAndDelete(id);
          res.status(200).json("Başarıyla silindi");
           
    }catch(err)
    {
        throw new Error(err);
    }
})


export const getBrand= asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
          const getBrand= await Brand.findById(id); 
          res.status(200).json(getBrand);
           
    }catch(err)
    {
        throw new Error(err);
    }
})

export const getAllBrand= asyncHandler(async(req,res)=>{
    try{
          const getAllBrand= await Brand.find(); 
          res.status(200).json(getAllBrand);
           
    }catch(err)
    {
        throw new Error(err);
    }
})