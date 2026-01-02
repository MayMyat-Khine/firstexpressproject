import { matchedData } from "express-validator";
import { createOrderService } from "../services/order.service.mjs";
import { Order } from "../mongoose/schemas/order.mjs";

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

export async function orderGetAllController(req, res) {
    try {

        const orders = await Order.find();
        res.json({ success: true, body: orders });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

export async function orderGetByIdController(req, res) {

    try {
        const { foundOrder } = req;
        return res.status(200).send({ success: true, body: foundOrder });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}