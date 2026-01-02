import { matchedData } from "express-validator";
import { createOrderService } from "../services/order.service.mjs";

export async function orderCreateController(req, res) {
    try {

        const validDate = matchedData(req);
        console.log("Here is valid data in order controller", req.body);

        const savedOrder = await createOrderService(validDate);

        return res.status(200).send({ message: "Successfully Created Order" })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            details: error.details || []

        });
    }
}