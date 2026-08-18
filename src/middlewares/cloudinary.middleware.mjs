import cloudinary from "../config/cloudinary.mjs";

export const uploadToCloudinary = (
    buffer,
    folder = "retail/products"
) => {
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