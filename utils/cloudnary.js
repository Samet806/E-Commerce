import cloudinary from "cloudinary"
import dotenv from "dotenv"
dotenv.config();
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.SECRET_KEY // Click 'View Credentials' below to copy your API secret
});
    
    // Upload an image
    export const cloadinaryUploadImg = async (fileToUploads)=>{
        return new Promise ((resolve)=>{
            cloudinary.uploader.upload(fileToUploads,(result,error)=> {
               resolve({
                url:result.secure_url
               },
            {
              resource_type:"auto"  
            })
            })      
        })
    } 
    
    
    
    
  
