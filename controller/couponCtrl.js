import Coupon from "../models/couponModel.js"
import asyncHandler from "express-async-handler"
import { validateMongoDbId } from "../utils/validateMongodbld.js";


export const createCoupon= asyncHandler(async(req,res)=>{
   try{
       const newCoupon= await Coupon.create(req.body);
       res.json(newCoupon);
   }catch(err)
   {
    throw new Error(err);
   }

})

export const getAllCoupons= asyncHandler(async(req,res)=>{
    try{
        const coupons= await Coupon.find();
        res.json(coupons);
    }catch(err)
    {
     throw new Error(err);
    }
 
 })

 export const updateCoupon= asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
        const updatedcoupon= await Coupon.findByIdAndUpdate(id,req.body,{new:true})
        res.json(updateCoupon);
    }catch(err)
    {
     throw new Error(err);
    }
 
 })

 export const deleteCoupon= asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
        const deletedcoupon= await Coupon.findByIdAndDelete(id)
        res.json("başarıyla silindi");
    }catch(err)
    {
     throw new Error(err); 
    }
  
 })


 