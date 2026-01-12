import { matchedData } from "express-validator";
import { createTransferProductsService } from '../services/transfer_product.service.mjs';


export async function createTransferProductsController(req, res) {
    try {
        const validData = matchedData(req);
        const savedTrasferProducts = await createTransferProductsService(validData);
        return res.staus(200).send(savedTrasferProducts);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}