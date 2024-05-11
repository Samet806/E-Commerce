import express from "express"
import { createCategory, updateCategory } from "../controller/prodcategoryCtrl.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";


const router=express.Router();

router.post("/",authMiddleware,isAdmin,createCategory);
router.put("/:id",authMiddleware,isAdmin,updateCategory); 

export default router;