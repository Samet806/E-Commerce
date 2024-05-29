import Blog from "../models/blogModel.js"
import User from "../models/UserModel.js"
import asyncHandler from "express-async-handler"
import { validateMongoDbId } from "../utils/validateMongodbld.js";
import { cloadinaryUploadImg } from "../utils/cloudnary.js";
import fs from "fs"
// create blog
export const createBlog = asyncHandler(async (req, res) => {

    try {
        const newBlog = await Blog.create(req.body);
        res.json({
            status: "success",
            newBlog

        })

    } catch (err) {
        throw new Error(err);
    }
})

// update blog 
export const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, { $set: req.body }, { new: true })

        res.json({
            status: "success",
            updatedBlog
        })

    } catch (err) {
        throw new Error(err);
    }
})
// get a  blog 
export const getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const blog = await Blog.findById(id).populate("likes").populate("dislikes");
        await Blog.findByIdAndUpdate(id, { $inc: { numViews: 1 } }, { new: true })
        res.json(blog)


    } catch (err) {
        throw new Error(err);
    }
})

// get all  blog 
export const getAllBlog = asyncHandler(async (req, res) => {

    try {
        const blogs = await Blog.find();
        res.json(blogs)

    } catch (err) {
        throw new Error(err);
    }
})
// delete a  blog 
export const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        await Blog.findByIdAndDelete(id);
        res.json("Blog was deleted successfully")

    } catch (err) {
        throw new Error(err);
    }
})
//liked blog
export const likeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoDbId(blogId);
    try {
        const blog = await Blog.findById(blogId);
        const loginUserId = req?.user?._id;
        const isLiked = blog?.isLiked; 
    
         const alreadyDisliked =   blog?.dislikes;
         console.log(alreadyDisliked)
          if (alreadyDisliked) {
             const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
                  $pull: { dislikes: loginUserId },
                  isDisliked: false
              }, { new: true });
              
          }

        if (isLiked) {
            const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
                $pull: { likes: loginUserId }, 
                isLiked: false
            }, { new: true });
        
            res.status(200).json(updatedBlog);
        } else {
            const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
                $push: { likes: loginUserId },
                isLiked: true
            }, { new: true });
            res.status(200).json(updatedBlog);
        }
    } catch (error) {
        throw new Error("Sunucu Hatası");
    }
});

export const disLikeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoDbId(blogId);
    try {
        const blog = await Blog.findById(blogId);
        const loginUserId = req?.user?._id;
        const isDisliked = blog?.isDisliked; 
        
          const alreadyLiked = blog?.isLiked;

          if (alreadyLiked) {
              const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
                  $pull: { likes: loginUserId },
                  isLiked: false
              }, { new: true });
            
          }

        if (isDisliked) {
            const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
                $pull: { dislikes: loginUserId },
                isDisliked: false
            }, { new: true });
            res.status(200).json(updatedBlog);
        } else {
            const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
                $push: { dislikes: loginUserId },
                isDisliked: true
            }, { new: true });
            res.status(200).json(updatedBlog);
        }
    } catch (error) {
        throw new Error("Sunucu Hatası");
    }
});

export const uploadImages = asyncHandler(async (req, res) => {
    const { id } = req.params;
     
    try {
        const uploader = (path) => cloadinaryUploadImg(path);
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            console.log(file); 
            const newPath = await uploader(path);
            urls.push(newPath);
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(`Failed to delete file: ${path}`, err);
                } else {
                    console.log(`Successfully deleted file: ${path}`);
                }
            });  

        }

        const findBlog = await Blog.findByIdAndUpdate(id, {
            images: urls.map(file => file.url)
        }, { new: true });

        res.json(findBlog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});