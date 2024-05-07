import express from "express";
import { createProduct, getAllProducts, getaProduct } from "../controller/productCtrl.js";

const router=express.Router();


router.post("/",createProduct)
router.get("/",getAllProducts)
router.get("/:id",getaProduct)

export default router;