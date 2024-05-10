import { generateToken } from "../config/jwtToken.js";
import User from "../models/UserModel.js"
import asyncHandler from "express-async-handler";
import crypto from "crypto"
import { validateMongoDbId } from "../utils/validateMongodbld.js";
import { generateRefreshToken } from "../config/refreshToken.js";
import jwt from "jsonwebtoken"
import { sendMail } from "./emailCtrl.js";
export const createUser= asyncHandler(async (req,res)=>{
    const {password,email}=req.body;

    const findUser=await User.findOne({email:email});
    if(findUser)  throw new Error("User Already exists")

    const newUser= await User.create(req.body);
    res.status(201).json(newUser)
}
)

export const loginUserCtrl=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const findUser=await User.findOne({email:email})
    if(findUser && await findUser.isPasswordMatched(password)) 
    {
        const refreshToken= generateRefreshToken(findUser?._id);
        const updateuser=await User.findByIdAndUpdate(findUser?._id,{
            refreshToken:refreshToken
        },{new:true})
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            maxAge:72*60*60*1000,
        })

        res.status(200).json({
            _id:findUser?._id,
            firstname:findUser?.firstname,
            lastname:findUser?.lastname,
            email:findUser?.email,
            mobile:findUser?.mobile,
            token:generateToken(findUser?._id)
        })
    }
    else
    {
        throw new Error("Invalid Cretendials");
    }
})
//handle refresh token

export const handleRefreshToken =asyncHandler(async(req,res)=>{
   const cookie=req.cookies; 
   if(!cookie?.refreshToken) throw new Error("No refresh token in cookies")
   const refreshToken = cookie.refreshToken;
  const user=await User.findOne({refreshToken})
if(!user) throw new Error("No refresh token present in db")
jwt.verify(refreshToken,process.env.JWT_SECRET,(err,decoded)=>{
    if(err || user.id!== decoded.id)
    {
        throw new Error("There is something wrong with refresh token")
    }
    const accessToken=generateToken(user?.id);
    res.json({accessToken})
})
})

// logout functionality 
export const logout=asyncHandler(async (req,res)=>{
     const cookie=req.cookies;
     if(!cookie?.refreshToken) throw new Error("No refresh token in cookies")
     const refreshToken= cookie.refreshToken;
     const user=await User.findOne({refreshToken})
     if(!user) {
        res.clearCookie("refreshToken",{
            httpOnly:true,
            secure:true
        });
        return res.sendStatus(204);
        // forbidden
     }
     await User.findOneAndUpdate({refreshToken},{
        refreshToken:""
     })
     res.clearCookie("refreshToken",{
        httpOnly:true,
        secure:true
    });
     res.sendStatus(204);
})
//update user

export const updateOneUser=asyncHandler(async(req,res)=>{
     const {_id}=req.user;
     validateMongoDbId(_id)
         try{
        const updateUser=await User.findByIdAndUpdate(_id,{
            firstname:req?.body.firstname,
            lastname:req?.body.lastname,
            email:req?.body.email,
            mobile:req?.body.mobile
        }, {new:true}) ;
        res.status(200).json(updateUser);
    }
    catch(error)
    {
        throw new Error(error)
    }

})

//get All users
export const getAllUsers=asyncHandler(async (req,res)=>{
    try{
        const users=  await User.find();
        res.status(200).json(users)
    }
    catch(err)
    {
        throw new Error(err);
    }
})
//get single user
export const getUser=asyncHandler(async (req,res)=>{
    validateMongoDbId(req.params.id)

    try{
        const user=  await User.findOne({_id:req.params.id});
        res.status(200).json(user)
    }
    catch(err)
    {
        throw new Error(err);
    }

})

// delete a user
export const deleteUser=asyncHandler(async (req,res)=>{
    try{
        const user=  await User.findByIdAndDelete(req.params.id);
        res.status(200).json(user)
    }
    catch(err)
    {
        throw new Error(err);
    }

})

export const blockUser=asyncHandler(async (req,res)=>{
     const {id}=req.params;
     validateMongoDbId(id)

     try{
        const block=await User.findByIdAndUpdate(id,{$set:{isBlocked:true}},{new:true});
        res.status(203).json({message:"User blocked"});
     }
     catch(err)
     {
        throw new Error(err);
     }
})

export const unblockUser=asyncHandler(async (req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id)

    try{
        const block=await User.findByIdAndUpdate(id,{$set:{isBlocked:false}},{new:true});
        res.status(203).json({message:"User unblocked"});
     }
     catch(err)
     {
        throw new Error(err);
     }
})

export const updatePassword =asyncHandler(async (req,res)=>{
    const {_id}=req.user;
    const {password}=req.body;
  
    validateMongoDbId(_id);
    const user=await User.findById(_id);
    if(password)
        {
            user.password=password;
            const updatePassword=await user.save();
            res.json(updatePassword)
        }
        else{
            res.json(user);
        }
})

export const forgotPasswordToken=asyncHandler(async (req,res)=>{
       const {email}=req.body;
       const user=await User.findOne({email});
       if(!user) throw new Error("User not found with this email")
        try{
            const token=await  user.createPasswordResetToken();
            await user.save();
            const resetURL=`Hi , please follow this link to reset your password. This link is valid till 10 minutes from now.
             <a href="http://localhost:3000/api/user/reset-password/${token}"> Click Here </>`
            const data={
                to:email,
                text:"Hey User",
                subject:"Forgot password Link",
                htm:resetURL
            }
            sendMail(data)
            res.json(token)
        }
    catch(error){
         throw new Error(error)
    }
})

export const resetPassword=asyncHandler(async (req,res)=>{
     const {password}=req.body;
     const {token}=req.params;
     const hashedToken=crypto.createHash("sha256").update(token).digest("hex");
     const user =await User.findOne({
        passwordResetToken:hashedToken,
       passwordResetExpires:{$gt:Date.now()} 
    });
   if(!user) throw new Error("Token Expired, Please try again later")
    user.password=password;
user.passwordResetToken=undefined;
user.passwordResetToken=undefined;
await user.save();
res.json(user);
})
  