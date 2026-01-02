import mongoose from 'mongoose';
import { Order } from "../mongoose/schemas/order.mjs";
import { findUserById } from "../services/user.service.mjs";
import { findProductsByIds } from './product.service.mjs';
import { findStocksByProductIds, updateStock, updateStocksBulk } from './stock.service.mjs';


// assume merchant data is valid here
// check merchant id and customer id are valid
// check product data  and stock data is valid
// check the purchase stock is lower than the stock of the product-stock
// save the order create
// substract stock and update stock-db
export const createOrderService = async (orderData) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // === Validate Customer === //
        const customer = await findUserById(orderData['customer_id']);
        if (!customer) {
            const error = Error("Invalid customer id");
            error.statusCode = 400;
            throw error;
        }

        const productIds = orderData['purchase_products'].map(product => product.id);

        const validProducts = await findProductsByIds(productIds);
        if (validProducts.length !== productIds.length) {
            const error = Error("Invalid product id");
            error.statusCode = 400;
            throw error;
        }

        const validProductsIds = validProducts.map(product => product.id);

        const stocks = await findStocksByProductIds(validProductsIds);

        // === Stock Mapping === //
        const stockMap = {};
        stocks.forEach(stockData => {
            stockMap[stockData.product_id] = stockData.stock;
        });

        // === Validate Stock with Purchase Quantity === //
        const purchaseProducts = orderData['purchase_products'];
        const validateStockResult = purchaseProducts.map((item => {
            const available = stockMap[item.id];

            if (available === undefined) {
                return { "product_id": item.id, "valid": false, "message": "No Product" };
            }
            else if (available < item.quantity) {
                return { "product_id": item.id, "valid": false, "message": "Insufficient stock" };
            }

            return { "product_id": item.id, "valid": true };

        }));

        const hasInvalid = validateStockResult.some(result => !result.valid);
        if (hasInvalid) {
            const invalids = validateStockResult.filter(result => !result.valid);
            const error = Error("Failed at stock checking");
            error.statusCode = 400;
            error.details = invalids;
            throw error;
        }

        // === Create order after all validation === // 
        const newOrder = new Order(orderData);
        const savedOrder = await newOrder.save({ session });


        // === Substract and Update the  stock  db === //
        const updatedStocks = await updateStocksBulk(purchaseProducts.map(({ id, quantity }) => ({
            product_id: id,
            stockData: { stock: stockMap[id] - quantity }
        })), session);
        if (updatedStocks.modifiedCount !== purchaseProducts.length) {
            return Error("Failed to update all stocks after order create");
        }

        await session.commitTransaction();

        return savedOrder;

    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        throw error;
    } finally {
        session.endSession();
    }

};