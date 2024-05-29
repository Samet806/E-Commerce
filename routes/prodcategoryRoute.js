import express from "express"
import { createCategory, deleteCategory, getAllCategory, getCategory, updateCategory } from "../controller/prodcategoryCtrl.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";


const router=express.Router();

router.post("/",authMiddleware,isAdmin,createCategory);
router.get("/",getAllCategory);
router.get("/:id",getCategory)
router.put("/:id",authMiddleware,isAdmin,updateCategory); 
router.delete("/:id",authMiddleware,isAdmin,deleteCategory)
export default router;