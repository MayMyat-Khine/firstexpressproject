import AppErrors from "../utils/appErrors.mjs";

export const parseProductFormData = (req, res, next) => {
    console.log("here is parseproductformdata middleware", req.body)
    if (req.body.price) {
        try {
            if (typeof req.body.price === "string") {
                req.body.price = JSON.parse(req.body.price);
                console.log("after parse for price with currency pair,", req.body.price)
            }
        } catch (err) {
            throw new AppErrors("Invalid price format", 400);
        }
    }

    if (typeof req.body.branch_id === "string") {
        try {
            req.body.branch_id = req.body.branch_id.split(",");// JSON.parse(req.body.branch_id);
        } catch (error) {
            throw new AppErrors("Invalid branch_id format", 400);
        }

    }
    if (typeof req.body.delete_image === "string") {
        try {
            req.body.delete_image = req.body.delete_image.split(",");// JSON.parse(req.body.branch_id);
        } catch (error) {
            throw new AppErrors("Invalid delete_image format", 400);
        }

    }

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        if (!req.body.images) {
            req.body.images = req.files.map(file => file.filename || file.path);
        }
    }

    console.log("here is parseproductformdata middleware, FINISHEDDD")
    next();
};