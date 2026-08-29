import * as cartRepo from "../repositories/cart.repository.js";
import { findProductById } from "./product.service.js";

export const createCart = async (cartData, customer) => {

    try {
        // check products valid
        const ids = cartData.items.map(item => item.product_id);
        console.log("P ids", ids)
        await findProductById(ids)
        const savedCart = await cartRepo.createCartRepo(cartData.items, customer.id);
        return savedCart;
    } catch (error) {
        throw error;
    }
}

export const getCartByCustomr = async (customrId) => {
    return await cartRepo.getCartRepo(customrId);
}