import { matchedData } from "express-validator";
import { createTransferProductsService, getAllRecords } from '../services/transfer_product.service.mjs';


export async function createTransferProductsController(req, res, next) {
    try {
        const validData = matchedData(req);
        const savedTrasferProducts = await createTransferProductsService(validData);
        return res.status(200).send(savedTrasferProducts);
    } catch (error) {
        next(error)
    }
}

export async function getTransferProductsController(req, res, next) {
    try {
        const records = await getAllRecords();
        return res.status(200).send({ success: true, body: records });
    } catch (error) {
        next(error)
    }
}