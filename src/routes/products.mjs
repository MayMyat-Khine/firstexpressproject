import { Router } from "express";
import { createProductValidationSchema, indexValidationSchema } from "../utils/validationSchema.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { Product } from "../mongoose/schemas/product.mjs";
import { findByProductId, updateByProductId, updateSpecificByProductId } from "../utils/middlewares.mjs";

const router = Router();

router.post('/api/product', checkSchema(createProductValidationSchema),
    async (req, res) => {
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

router.get("/api/products", async (req, res) => {
    console.log("Product Get Fectched");
    try {
        const products = await Product.find();
        return res.json(products);
    } catch (error) {
        return res.status(404).send(error.message);
    }
})

router.get("/api/product/:id", checkSchema(indexValidationSchema), findByProductId, (req, res) => {
    const result = validationResult(req);

    console.log(result.array());

    if (!result.isEmpty()) return res.status(400).send(result.array());
    try {
        const { foundProduct } = req;
        if (foundProduct === null) return res.sendStatus(404);
        return res.status(200).send(foundProduct);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
})

// actually the indexValidation is not working well here
router.put("/api/product/:id", checkSchema(indexValidationSchema), updateByProductId, async (req, res) => {
    try {
        const { updatedProduct } = req;
        return res.status(200).send({ message: "Successfully Updated The Product", data: updatedProduct })
    } catch (error) {
        return res.status(400).send(error.message);
    }

})

router.patch("/api/product/:id", updateSpecificByProductId, (req, res) => {

    try {
        const { updatedProduct } = req;
        return res.status(200).send({ message: "Successfully Updated The Product", data: updatedProduct })
    } catch (error) {
        return res.status(400).send(error.message);
    }
})

router.delete("/api/product/:id", findByProductId, async (req, res) => {

    const { foundProduct, params: { id } } = req;
    if (!foundProduct) return res.sendStatus(404);
    const deletedProduct = await Product.deleteOne({ id });
    if (!deletedProduct.acknowledged) return res.sendStatus(400);
    return res.sendStatus(200);
})
export default router;