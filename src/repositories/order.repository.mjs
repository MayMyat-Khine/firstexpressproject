import { Order } from "../mongoose/schemas/order.mjs";

export const createOrderRepo = async (orderData, session) => {
    const newOrder = new Order(orderData);
    return await newOrder.save({ session });
}

export const getOrdersRepo = async ({ page, limit, search }) => {
    const filter = {};

    if (search) {
        filter.id = {
            $regex: search, // pattern matching string
            $options: "i" // ignore case
        };
    }

    const total = await Order.countDocuments(filter);

    let query = Order.find(filter).sort({ updatedAt: -1 });; //  .populate("stocks");
    if (page && limit) {

        query = query
            .skip((page - 1) * limit)
            .limit(limit);
    }
    const orders = await query;
    return {
        orders, total
    }
}

export const getOrdersByCustomerRepo = async (customerId, { page,
    limit,
    search }) => {

    const filter = {};

    if (search) {
        filter.id = {
            $regex: search, // pattern matching string
            $options: "i" // ignore case
        };
    }

    filter.customer_id = customerId;

    const total = await Order.countDocuments(filter);

    let query = Order.find(filter).sort({ updatedAt: -1 }); //  .populate("stocks");
    if (page && limit) {

        query = query
            .skip((page - 1) * limit)
            .limit(limit);
    }
    const orders = await query;
    return {
        orders, total
    }



    // return await Order.find({ customer_id: customerId });
}

export const getOrderByIdRepo = async (id) => {
    return await Order.findOne({ id: id });
}

export const getMyOrderByIdRepo = async (id, customerId) => {
    return await Order.findOne({ id: id, customer_id: customerId });
}

export const getOrderByBranchRepo = async (id) => {

    return await Order.find({ branch_id: id }).sort({ updatedAt: -1 });;
}

export async function updateOrderRepo(id, body) {
    const updatedOrder = await Order.findOneAndUpdate(
        { id: id },
        body,
        { new: true, runValidators: true });
    return updatedOrder;
}