import { Router } from "express";
import { createProductValidationSchema } from "../utils/validationSchema.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { Product } from "../mongoose/schemas/product.mjs";

const router = Router();

router.post('/api/product', checkSchema(createProductValidationSchema), async (req, res) => {
    console.log("Product Create Post ");
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send(result.array());

    const data = matchedData(req);
    console.log("here is data before process to model", data);
    const newProduct = Product(data);

    try {
        console.log("here is product before save to db ", newProduct);
        const savedProduct = await newProduct.save();
        return res.send(savedProduct);
    } catch (error) {
        console.log("Product Create Post error");
        return res.status(400).json({ success: false, message: error.message, errors: error.errors || null });

    }

})
export default router;