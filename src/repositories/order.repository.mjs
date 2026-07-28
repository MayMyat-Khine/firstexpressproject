import { Order } from "../mongoose/schemas/order.mjs";

export const createOrderRepo = async (orderData, session) => {
    const newOrder = new Order(orderData);
    return await newOrder.save({ session });
}

export const getOrdersRepo = async () => {
    return await Order.find();
}

export const getOrdersByCustomerRepo = async (customerId) => {
    return await Order.find({ customer_id: customerId });
}

export const getOrderByIdRepo = async (id) => {
    return await Order.findOne({ id: id });
}

export const getMyOrderByIdRepo = async (id, customerId) => {
    return await Order.findOne({ id: id, customer_id: customerId });
}

export const getOrderByBranchRepo = async (id) => {
    return await Order.find({ branch_id: id });
}

export async function updateOrderRepo(id, body) {
    const updatedOrder = await Order.findOneAndUpdate(
        { id: id },
        body,
        { new: true, runValidators: true });
    return updatedOrder;
}