import { Router } from 'express';
import { createStockValidationSchema, indexValidationSchema } from '../utils/validationSchema.mjs';
import { checkSchema, matchedData, validationResult } from 'express-validator';
import { findByProductId, findProductFromStock } from '../utils/middlewares.mjs';
import { Stock } from '../mongoose/schemas/stock.mjs';

const router = Router();

router.post("/api/stock/:id", checkSchema(createStockValidationSchema), findByProductId, async (req, res) => {
    console.log("Stock Create Post");
    const result = validationResult(req);
    const { foundProduct } = req;
    console.log(result.array());
    console.log(foundProduct);
    if (!result.isEmpty()) return res.status(400).send(result.array());
    if (!foundProduct) return res.status(404).send(`This product ${req.id} is not found`);

    const data = matchedData(req);
    const newStock = Stock(data);
    try {
        const savedStock = await newStock.save();
        return res.send(savedStock);
    } catch (error) {
        return res.status(400).send(error.message);
    }
})

router.get("/api/stocks", async (req, res) => {
    console.log("Here is Stock Get API");
    try {
        const stocks = await Stock.find();
        // here need to find the related product names 
        return res.json(stocks);
    } catch (error) {
        return res.status(404).send(error.message);
    }
})

router.get("/api/stock/:id", checkSchema(indexValidationSchema), findProductFromStock, findByProductId, async (req, res) => {
    console.log("Get Stock With ID ");
    const result = validationResult(req);
    const { foundProduct, foundProductFromStock } = req;

    console.log(result.array());
    console.log("Found Product ", foundProduct);
    console.log("Found Product from stock", foundProductFromStock);
    if (!result.isEmpty()) return res.status(400).send(result.array());
    if (!foundProduct || !foundProductFromStock) return res.status(404).send(`This product ${req.id} is not found`);

    try {
        const foundStock = await Stock.findOne({ product_id: req.id })
        console.log("Here is the Stock Find By Product ID", foundStock);
        return res.status(200).send(foundStock);
    } catch (error) {
        return res.status(400).send(error.message);
    }
})
export default router;