import { matchedData } from "express-validator";
import { createCart, getCartByCustomr } from "../services/cart.service.mjs";
import { success } from "zod";

export async function createCartController(req, res, next) {

    const data = matchedData(req);
    try {
        console.log("data at cart create controller", data)
        const cart = await createCart(data, req.customer);
        return res.status(201).send({ success: true, body: cart })
    } catch (error) {
        next(error);
    }
}

export async function getCartByCustomerController(req, res, next) {
    try {
        const cart = await getCartByCustomr(req.customer.id);
        return res.status(201).send({ success: true, body: cart })
    } catch (error) {
        next(error);
    }
}