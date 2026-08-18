import multer from "multer";
import path from "path";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/products");
//     },

//     filename: function (req, file, cb) {
//         const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
//         cb(null, uniqueName);

//     }
// });

const storage = multer.memoryStorage();

export const uploadProductImage = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter(req, file, cb) {
        const allowed = [
            "image/jpeg",
            "image/png",
            "image/jpg"
        ];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("Only image files allowed"));
        }
    }
});