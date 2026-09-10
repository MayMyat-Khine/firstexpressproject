import { Order } from "../mongoose/schemas/order.js";
import { Customer } from "../mongoose/schemas/customer.js";
import { Product } from "../mongoose/schemas/product.js";

export const createOrderRepo = async (orderData, session) => {
    const newOrder = new Order(orderData);
    return await newOrder.save({ session });
}

export const getOrdersRepo = async ({ page, limit, search, branchId, customerId, status }) => {
    const filter = {};
    if (status) {
        filter.status = status;
    }
    if (branchId) {
        filter.branch_id = branchId;
    }
    if (customerId) {
        filter.customer_id = customerId;
    }
    if (search) {
        const regex = { $regex: search, $options: "i" };

        const customerIds = await Customer.find({ name: regex }).distinct("id");
        const productIds = await Product.find({ product_name: regex }).distinct("id");

        const orConditions = [
            { id: regex }, // Order ID (starts with "OSVxxxx...")
            ...(customerIds.length ? [{ customer_id: { $in: customerIds } }] : []),
            ...(productIds.length ? [{ "purchase_products.id": { $in: productIds } }] : [])
        ];

        filter.$or = orConditions;
    }

    const total = await Order.countDocuments(filter);
    console.log("total order list ", total)
    const effectivePage = page != null ? Number(page) : 1;
    const effectiveLimit = limit != null ? Number(limit) : 20;
    let query = Order.find(filter).sort({ updatedAt: -1 }); //  .populate("stocks");
    query = query
        .skip((effectivePage - 1) * effectiveLimit)
        .limit(effectiveLimit);
    const orders = await query;
    const pagination = {
        page: effectivePage,
        limit: effectiveLimit,
        total
    };
    return {
        orders, pagination
    }
}

export const getOrdersByCustomerRepo = async (customerId, { page, limit, search, status, payment_method, createdAt }) => {

    const filter = { customer_id: customerId };

    if (status) {
        filter.status = status;
    }

    if (payment_method) {
        filter.payment_method = payment_method;
    }

    if (createdAt) {
        const d = new Date(createdAt);
        if (!isNaN(d.getTime())) {
            const start = new Date(d);
            start.setHours(0, 0, 0, 0);
            const end = new Date(d);
            end.setHours(23, 59, 59, 999);
            filter.createdAt = { $gte: start, $lte: end };
        }
    }

    if (search) {
        const regex = { $regex: search, $options: "i" };
        const productIds = await Product.find({ product_name: regex }).distinct("id");

        const orConditions = [
            { id: regex }, // Order ID (OSVxxxx...)
            { status: regex },
            { payment_method: regex },
            ...(productIds.length ? [{ "purchase_products.id": { $in: productIds } }] : [])
        ];

        // If search looks like a date (YYYY-MM-DD), also match createdAt
        const parsedSearchDate = new Date(search);
        if (!isNaN(parsedSearchDate.getTime()) && /^\d{4}-\d{2}-\d{2}/.test(search)) {
            const start = new Date(parsedSearchDate);
            start.setHours(0, 0, 0, 0);
            const end = new Date(parsedSearchDate);
            end.setHours(23, 59, 59, 999);
            orConditions.push({ createdAt: { $gte: start, $lte: end } });
        }

        filter.$or = orConditions;
    }

    const total = await Order.countDocuments(filter);

    const effectivePage = page != null ? Number(page) : 1;
    const effectiveLimit = limit != null ? Number(limit) : 20;
    let query = Order.find(filter).sort({ updatedAt: -1 }); //  .populate("stocks");
    query = query
        .skip((effectivePage - 1) * effectiveLimit)
        .limit(effectiveLimit);
    const orders = await query;
    const pagination = {
        page: effectivePage,
        limit: effectiveLimit,
        total
    };
    return {
        orders, pagination
    }
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

export async function updateOrderRepo(id, body, session) {
    const updatedOrder = await Order.findOneAndUpdate(
        { id: id },
        body,
        { new: true, runValidators: true, session });
    return updatedOrder;
}