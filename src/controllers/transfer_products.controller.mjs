import { matchedData } from "express-validator";
import { createTransferProductsService } from '../services/transfer_product.service.mjs';


export async function createTransferProductsController(req, res, next) {
    try {
        const validData = matchedData(req);
        const savedTrasferProducts = await createTransferProductsService(validData);
        return res.status(200).send(savedTrasferProducts);
    } catch (error) {
        next(error)
    }
}