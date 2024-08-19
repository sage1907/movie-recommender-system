import fs from "fs"
import { v2 as cloudinary } from "cloudinary"

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRETS_KEY
});

// Helper function to upload a file to Cloudinary
export const uploadToCloudinary = async (file, folder) => {
    try {
        const result = await cloudinary.uploader.upload(file.path, { folder });
        // Delete the temporary file
        fs.unlinkSync(file.path);
        // console.log(result);
        return {
            public_id: result.public_id,
            url: result.secure_url,
        };
    } catch (err) {
        throw new Error(`Cloudinary upload failed: ${err.message}`);
    }
};

// Helper function to delete Cloudinary file
export const deleteFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (err) {
        console.error(`Failed to delete Cloudinary resource: ${err.message}`);
    }
};