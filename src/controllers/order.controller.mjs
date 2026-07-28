import { matchedData } from "express-validator";
import { createOrderService, updateOrder, getOrders, getOrderById, getOrderByBranch, getOrdersByCustomer, getMyOrderById } from "../services/order.service.mjs";
import { Order } from "../mongoose/schemas/order.mjs";

export async function orderCreateController(req, res, next) {
    try {

        const validData = matchedData(req);
        const savedOrder = await createOrderService(validData, req.customer.id);
        return res.status(200).send({ success: true, body: savedOrder })
    } catch (error) {
        next(error)
    }
}

export async function orderGetAllController(req, res, next) {
    try {
        var validateData = matchedData(req);
        const { orders, total } = await getOrders(validateData);
        res.json({ success: true, body: orders, total: total });

    } catch (error) {
        next(error)
    }
};

export async function orderGetMyOrdersController(req, res, next) {
    try {
        const customerId = req.customer.id;
        var validateData = matchedData(req);
        const { orders, total } = await getOrdersByCustomer(customerId, validateData);
        res.json({ success: true, body: orders, total: total });

    } catch (error) {
        next(error)
    }
};

export async function orderGetMyOrderByIdController(req, res, next) {

    try {
        const foundOrder = await getMyOrderById(req.customer.id, req.params.id);
        return res.status(200).send({ success: true, body: foundOrder });
    } catch (error) {
        next(error)
    }
}

export async function orderGetByIdController(req, res, next) {

    try {
        const foundOrder = await getOrderById(req.params.id);
        return res.status(200).send({ success: true, body: foundOrder });
    } catch (error) {
        next(error)
    }
}

export async function orderGetByBranchController(req, res, next) {

    try {
        const foundOrders = await getOrderByBranch(req.params.id);
        return res.status(200).send({ success: true, body: foundOrders, count: foundOrders.length });
    } catch (error) {
        next(error)
    }
}

// === Current only update the Status and Notes === //
// export async function orderUpdateByIdController(req, res) {
//     try {
//         const { original_products, new_products, delete_products } = req.body;
//         console.log("Req Body ", req.body);
//         validateUniqueOfProducts(original_products, new_products, delete_products);
//         const updatedOrder = await updateOrder(req.params.id, req.body);
//         if (updatedOrder !== null) {
//             return res.status(200).send({ message: "Successfully Updated", data: updatedOrder })
//         } else {
//             throw new Error(`Order with id ${req.params.id} not found`);
//         }
//     } catch (error) {
//         return res.status(400).json({ message: error.message });
//     }
// };

export async function orderUpdateByIdController(req, res, next) {
    try {
        const updatedOrder = await updateOrder(req.params.id, req.body);
        return res.status(200).send({ success: true, body: updatedOrder })
    } catch (error) {
        next(error)
    }
};

// === For: Current only update the Status and Notes === //
// function validateUniqueOfProducts(originalProducts = [], newProducts = [], deleteProducts = []) {
//     const allIds = [...originalProducts.map(p => p.id), ...newProducts.map(p => p.id), ...deleteProducts];
//     const uniqueIds = new Set(allIds);
//     if (uniqueIds.size !== allIds.length) {
//         throw new Error("Duplicate products in request payload");
//     }
// };