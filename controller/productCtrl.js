import Product from "../models/ProductModel.js"
import asyncHandler from "express-async-handler"
import slugify from "slugify";
//create product
export const createProduct=asyncHandler(async (req,res)=>{ 
 try{
    if(req.body.title)
        {
            req.body.slug=slugify(req.body.title);
        }
    const savedProduct=await Product.create(req.body);
    res.status(201).json(savedProduct);  

 }catch(err)
 {
    throw new Error(err)
 }
})
// update a product 
 export const updateProduct=asyncHandler(async (req,res)=>{
    const {id} =req.params;
    try{
        if(req.body.title)
            {
                req.body.slug=slugify(req.body.title);
            }
           const updatedProduct = await Product.findByIdAndUpdate(id,{$set:req.body},{new:true})
           res.status(204).json(updatedProduct);

    }catch(err)
    {
        throw new Error(err)
    }
 })

 // update a product 
 export const deleteProduct=asyncHandler(async (req,res)=>{
    const {id} =req.params;
    try{
           const updatedProduct = await Product.findByIdAndDelete(id)
           res.status(204).json("Başarıyla silindi ");

    }catch(err)
    {
        throw new Error(err)
    }
 })
//get all products
export const getAllProducts=asyncHandler(async (req,res)=>{
    const queryObj={...req.query};
    const excludeFields=["page","sort","limit","fields"]
    excludeFields.forEach(el=>{
        console.log(queryObj[el])
        return delete queryObj[el]})
    
    try{
        const products= await Product.find(
            queryObj
        );
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
