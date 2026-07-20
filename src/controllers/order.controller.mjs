import { matchedData } from "express-validator";
import { createOrderService, updateOrder } from "../services/order.service.mjs";
import { Order } from "../mongoose/schemas/order.mjs";

export async function orderCreateController(req, res, next) {
    try {

        const validDate = matchedData(req);

        const savedOrder = await createOrderService(validDate);
        return res.status(200).send({ message: "Successfully Created Order", body: savedOrder })
    } catch (error) {
        next(error)
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

export async function orderUpdateByIdController(req, res) {

    try {
        const { original_products, new_products, delete_products } = req.body;
        console.log("Req Body ", req.body);
        validateUniqueOfProducts(original_products, new_products, delete_products);
        const updatedOrder = await updateOrder(req.params.id, req.body);
        if (updatedOrder !== null) {
            return res.status(200).send({ message: "Successfully Updated", data: updatedOrder })
        } else {
            throw new Error(`Order with id ${req.params.id} not found`);
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

function validateUniqueOfProducts(originalProducts = [], newProducts = [], deleteProducts = []) {

    const allIds = [...originalProducts.map(p => p.id), ...newProducts.map(p => p.id), ...deleteProducts];

    const uniqueIds = new Set(allIds);
    if (uniqueIds.size !== allIds.length) {
        throw new Error("Duplicate products in request payload");
    }
};