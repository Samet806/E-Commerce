import express from "express";
import { createProduct, deleteProduct, getAllProducts, getaProduct, updateProduct } from "../controller/productCtrl.js";
import {isAdmin,authMiddleware} from "../middlewares/authMiddleware.js"
const router=express.Router();


router.post("/",authMiddleware,isAdmin,createProduct)
router.get("/",getAllProducts)
router.get("/:id",getaProduct)
router.put("/:id",authMiddleware,isAdmin,updateProduct)
router.delete("/:id",authMiddleware,isAdmin,deleteProduct)
export default router;