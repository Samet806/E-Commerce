import express from "express"
import {authMiddleware,isAdmin} from "../middlewares/authMiddleware.js"
import { createCoupon, deleteCoupon, getAllCoupons, updateCoupon } from "../controller/couponCtrl.js";

const router=express.Router();


router.post("/",authMiddleware,isAdmin,createCoupon)
router.get("/",authMiddleware,isAdmin,getAllCoupons)
router.put("/:id",authMiddleware,isAdmin,updateCoupon)
router.delete("/:id",authMiddleware,isAdmin,deleteCoupon)


export default router; 