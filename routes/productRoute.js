import express from "express";
import { addToWishlist, createProduct, deleteProduct, getAllProducts, getaProduct, rating, updateProduct, uploadImages } from "../controller/productCtrl.js";
import {isAdmin,authMiddleware} from "../middlewares/authMiddleware.js"
import { productImgResize, uploadPhoto } from "../middlewares/uploadimages.js";
const router=express.Router();

router.post("/",authMiddleware,isAdmin,createProduct)
router.put("/upload/:id",authMiddleware,isAdmin,uploadPhoto.array("images",10),productImgResize,uploadImages)

router.get("/",getAllProducts)


router.put("/wishlist",authMiddleware,addToWishlist)
router.put("/rating",authMiddleware,rating)

router.get("/:id",getaProduct)
router.put("/:id",authMiddleware,isAdmin,updateProduct)
router.delete("/:id",authMiddleware,isAdmin,deleteProduct)
export default router;