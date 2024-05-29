import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dbConnect from "./config/dbConnect.js";
import authRouter from "./routes/authRoute.js"
import productRouter from "./routes/productRoute.js"
import blogCatRouter from "./routes/blogCatRoute.js"
import brandRouter from "./routes/brandRouter.js"
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import blogRouter from "./routes/blogRoute.js"
import pcategoryRouter from "./routes/prodcategoryRoute.js"
import couponRouter from "./routes/couponRoute.js"
const app =express();
const env=dotenv.config();
const PORT=process.env.PORT || 3000;

app.use(morgan("tiny"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());

app.use("/api/user",authRouter)
app.use("/api/product",productRouter)
app.use("/api/blog",blogRouter)
app.use("/api/category",pcategoryRouter)
app.use("/api/blogcategory",blogCatRouter)
app.use("/api/brand",brandRouter) 
app.use("/api/coupon",couponRouter)
app.use(notFound)
app.use(errorHandler )


app.listen(PORT,()=>{
    dbConnect();
    console.log(`Server is running at PORT ${PORT}`)
}) 