import express from "express"
import {blockUser, createUser, deleteUser, forgotPasswordToken, getAllUsers, getUser, handleRefreshToken, loginUserCtrl, logout, resetPassword, unblockUser, updateOneUser, updatePassword} from "../controller/userCtrl.js"
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const router=express.Router();


router.post("/register",createUser)
router.post("/forgot-password-token",forgotPasswordToken)
router.put("/reset-password/:token",resetPassword)
router.put("/password",authMiddleware,updatePassword)
router.post("/login",loginUserCtrl)
router.get("/all-users",getAllUsers)
router.get("/refresh",handleRefreshToken)
router.get("/logout",logout)
router.get("/:id",authMiddleware,isAdmin,getUser)
router.delete("/:id",deleteUser)
router.put("/edit-user",authMiddleware,updateOneUser)
router.put("/block-user/:id",authMiddleware,isAdmin,blockUser)
router.put("/unblock-user/:id",authMiddleware,isAdmin,unblockUser)


export default router