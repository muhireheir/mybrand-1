import fs from "fs";
import cloudinary from "../config/cloudinary";

export const cloudinaryUploader = async(path) => {
    const { url } = await cloudinary.upload(path);
    fs.unlinkSync(path);
    return url;
};