import mongoose from 'mongoose';
import { User } from "../mongoose/schemas/user.mjs";

export const createOrderService = async (orderData) => {

    console.log("Here is create order service");
    console.log("Here is order Data", orderData);
    try {
        // check merchant id and customer id are valid
        // check product data is valid
        // check the purchase stock is lower then the max stock of the product
        // save the order create
        const userData = await User.findById();

    } catch (error) { }

};