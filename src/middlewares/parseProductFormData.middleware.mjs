import AppErrors from "../utils/appErrors.mjs";

export const parseProductFormData = (req, res, next) => {
    console.log("here is parseproductformdata middleware", req.body)
    if (req.body.price) {

        req.body.price = Number(req.body.price);
        console.log("here is price", req.body.price)
    }


    if (typeof req.body.branch_id === "string") {
        console.log("here is branch_id", req.body.branch_id)
        try {
            req.body.branch_id = req.body.branch_id.split(",");// JSON.parse(req.body.branch_id);
            console.log("here is price", req.body.branch_id)
        } catch (error) {
            throw new AppErrors("Invalid branch_id format", 400);
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