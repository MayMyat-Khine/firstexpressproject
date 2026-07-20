import { Order } from "../mongoose/schemas/order.mjs";

export const createOrderRepo = async (orderData, session) => {
    const newOrder = new Order(orderData);
    return await newOrder.save({ session });
}

export const getOrdersRepo = async () => {
    return await Order.find();
}

export const getOrderByIdRepo = async (id) => {
    return await Order.findOne({ id: id }).select('-__v -_id');
}

export const getOrderByBranchRepo = async (id) => {
    return await Order.find({ branch_id: id }).select('-__v -_id');
}

export async function updateOrderRepo(id, body) {
    const updatedOrder = await Order.findOneAndUpdate(
        { id: id },
        body,
        { new: true, runValidators: true });
    return updatedOrder;
}