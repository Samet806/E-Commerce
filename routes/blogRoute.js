import express from "express"
import { createBlog, deleteBlog, disLikeBlog, getAllBlog, getBlog, likeBlog, updateBlog, uploadImages } from "../controller/blogCtrl.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import { blogImgResize, uploadPhoto } from "../middlewares/uploadimages.js";


const router=express.Router();


router.post("/",authMiddleware,isAdmin,createBlog)
router.put("/upload/:id",authMiddleware,isAdmin,uploadPhoto.array("images",10),blogImgResize,uploadImages)
router.put("/likes",authMiddleware,likeBlog)
router.put("/dislikes",authMiddleware,disLikeBlog)
router.put("/:id",authMiddleware,isAdmin,updateBlog)
router.get("/:id",getBlog)
router.get("/",getAllBlog)
router.delete("/:id",authMiddleware,isAdmin,deleteBlog)

export default router