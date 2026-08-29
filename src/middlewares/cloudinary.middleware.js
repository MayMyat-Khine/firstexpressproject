import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (
    buffer,
    folder = "retail/products"
) => {

    console.log({
        cloudName: cloudinary.config().cloud_name,
        hasApiKey: !!cloudinary.config().api_key,
        hasApiSecret: !!cloudinary.config().api_secret,
    });
    console.log("Buffer", buffer);
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    console.log("Cloudinary Middleware", error);
                    reject(error);
                    return;
                }

                resolve(result);
            }
        );

        stream.end(buffer);
    });
};