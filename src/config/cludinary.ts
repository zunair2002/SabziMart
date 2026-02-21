import { v2 as cloudinary } from 'cloudinary';

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET
    });
export const uploadImage = async (file: File, folder: string) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    const response = await cloudinary.uploader.upload(base64Image, {
        folder: folder,
    });

    return response.secure_url; // Ye sirf image ka link wapas karega
};
export default cloudinary;