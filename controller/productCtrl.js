import { query } from "express";
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
    try{
    const queryObj={...req.query};
    const excludeFields=["page","sort","limit","fields"]
    excludeFields.forEach(el=>{
        return delete queryObj[el]})

    let queryStr=JSON.stringify(queryObj)
    queryStr=  queryStr.replace(/\b(gte|gt|lte|lt)\b/g , (match)=>`$${match}`);
    let query= Product.find(JSON.parse(queryStr))
      
// sorting
    if(req.query.sort)
    {
        const  sortBy=req.query.sort.split(",").join(" ");
        query=query.sort(sortBy)
    }else
    {
       query=query.sort("-createdAt")
    }

    //limiting  the filters
    if(req.query.fields){
        const  fields=req.query.fields.split(",").join(" ");
        query=query.select(fields)
    }
    else
    {
     query=query.select("-__v")
     console.log(query);
    }

    //pagination 
    const page =parseInt(req.query.page);
    const limit=parseInt(req.query.limit);
    const skip=(page -1)*limit;
    query=query.skip(skip).limit(limit);
    if(req.query.page)
       {
           const productCount= await Product.countDocuments();
           if(skip >= productCount) throw new Error("This Page does not exists")
       }

      const products=await query;
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
