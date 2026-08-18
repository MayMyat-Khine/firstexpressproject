import cloudinary from "../config/cloudinary.mjs";

export const uploadToCloudinary = (
    buffer,
    folder = "retail/products"
) => {

    console.log({
        cloudName: cloudinary.config().cloud_name,
        hasApiKey: !!cloudinary.config().api_key,
        hasApiSecret: !!cloudinary.config().api_secret,
    });
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            }
        );

        stream.end(buffer);
    });
};