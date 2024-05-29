import express from "express"
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import { createBrand, deleteBrand, getAllBrand, getBrand, updateBrand } from "../controller/brandCtrl.js";


const router=express.Router();

router.post("/",authMiddleware,isAdmin,createBrand);
router.get("/",getAllBrand);
router.get("/:id",getBrand)
router.put("/:id",authMiddleware,isAdmin,updateBrand); 
router.delete("/:id",authMiddleware,isAdmin,deleteBrand)
export default router;