import { matchedData } from "express-validator";
import { Product } from "../mongoose/schemas/product.mjs";


export async function createTransferProductsController(req, res) {
    try {
        const validData = matchedData(req);
        // const savedTrasferProducts = await;
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}