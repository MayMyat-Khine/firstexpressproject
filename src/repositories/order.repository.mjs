import { Order } from "../mongoose/schemas/order.mjs";

export const createOrder = async (orderData, session) => {
    const newOrder = new Order(orderData);
    return await newOrder.save({ session });
}