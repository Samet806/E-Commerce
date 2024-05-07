import Product from "../models/ProductModel.js"
import asyncHandler from "express-async-handler"
//create product
export const createProduct=asyncHandler(async (req,res)=>{ 
 try{
    const savedProduct=await Product.create(req.body);
    res.status(201).json(savedProduct);  

 }catch(err)
 {
    throw new Error(err)
 }
})
//get all products
export const getAllProducts=asyncHandler(async (req,res)=>{
    try{
        const products= await Product.find();
        res.status(200).json(products);

    }
    catch(err)
    {
        throw new Error(err)
    }
})
//get a product
export const getaProduct=asyncHandler(async (req,res)=>{
    const {id}=req.params;
    try{
        const product= await Product.findById(id);
        res.status(200).json(product);

    }
    catch(err)
    {
        throw new Error(err)
    }
})
