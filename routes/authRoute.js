import express from "express"
import {applyCoupon, blockUser, createOrder, createUser, deleteUser, emtyCart, forgotPasswordToken, getAllUsers, getOrders, getUser, getUserCart, getWishlist, handleRefreshToken, loginAdmin, loginUserCtrl, logout, resetPassword, saveAddress, unblockUser, updateOneUser, updateOrderStatus, updatePassword, userCart} from "../controller/userCtrl.js"
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const router=express.Router();


router.post("/register",createUser)
router.post("/forgot-password-token",forgotPasswordToken)
router.put("/reset-password/:token",resetPassword)
router.put("/password",authMiddleware,updatePassword)
router.put("/update-order/:id",authMiddleware,isAdmin,updateOrderStatus)
router.post("/login",loginUserCtrl)
router.post("/admin-login",loginAdmin)
router.post("/cart",authMiddleware,userCart)
router.post("/cart/applycoupon",authMiddleware,applyCoupon)
router.post("/cart/cash-order",authMiddleware,createOrder)
router.get("/all-users",getAllUsers)
router.get("/refresh",handleRefreshToken)
router.get("/logout",logout)
router.get("/wishlist",authMiddleware,getWishlist)
router.get("/cart",authMiddleware,getUserCart)
router.get("/order",authMiddleware,getOrders)

router.get("/:id",authMiddleware,isAdmin,getUser)
router.delete("/empty-cart",authMiddleware,emtyCart)
router.delete("/:id",deleteUser)
router.put("/edit-user",authMiddleware,updateOneUser)
router.put("/save-address",authMiddleware,saveAddress)
router.put("/block-user/:id",authMiddleware,isAdmin,blockUser)
router.put("/unblock-user/:id",authMiddleware,isAdmin,unblockUser)


export default router