import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
/**
 * v2 as cloudinary → renames v2 to cloudinary for easier use.
 * Cloudinary is used for uploading, storing, and managing images/videos.
 */
// cloudinary.config({
//     secure: true
//   });
cloudinary.config({//Calls the config() method to initialize Cloudinary with your account credentials.
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;//Allows you to use it anywhere in your backend without reconfiguring.
