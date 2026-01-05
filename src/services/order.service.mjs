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

export const updateOrder = async (orderId, orderData) => {
    // here no case for PRODUCT HAD BEEN DELETED AND STOCK ADDING AS RETURN STOCK 
    // but in real case need to handle that 
    // check product presence
    // check stock availability
    // update order {session}
    // update stock {session}
    try {

        console.log("Here is order id", orderId);
        console.log("here is order update data", orderData);
        // ==== Original Products Validation ==== //
        const originalProductsIds = orderData['original_products'].map(product => product.id);

        // ==== New Products Validation ==== //
        const newProductsIds = orderData['new_products'] ? orderData['new_products'].map(product => product.id) : [];

        // ==== Delete Products Validation === //
        const deleteProductsIds = orderData['delete_products'] ? orderData['delete_products'].map(product => product.id) : [];


        const validOriginalProducts = await findProductsByIds(originalProductsIds);
        if (validOriginalProducts.length !== originalProductsIds.length) {
            const error = Error("Invalid product id");
            error.statusCode = 400;
            throw error;
        }

        const validNewProducts = await findProductsByIds(newProductsIds);
        if (validNewProducts.length !== newProductsIds.length) {
            const error = Error("Invalid product id");
            error.statusCode = 400;
            throw error;
        }

        const validDeleteProducts = await findProductsByIds(deleteProductsIds);
        if (validDeleteProducts.length !== deleteProductsIds.length) {
            const error = Error("Invalid product id");
            error.statusCode = 400;
            throw error;
        }

        const validOriginalProductsIds = validOriginalProducts.map(product => product.id);
        const validNewProductsIds = validNewProducts.map(product => product.id);
        const validDeleteProductsIds = validDeleteProducts.map(product => product.id);

        const originalStocks = await findStocksByProductIds(validOriginalProductsIds);
        const newStocks = await findStocksByProductIds(validNewProductsIds);
        const deleteStocks = await findStocksByProductIds(validDeleteProductsIds);

        // === Stock Mapping === //
        const originalStockMap = {};
        originalStocks.forEach(stockData => {
            originalStockMap[stockData.product_id] = stockData.stock;
        });
        const newStockMap = {};
        newStocks.forEach(stockData => {
            newStockMap[stockData.product_id] = stockData.stock;
        });
        const deleteStockMap = {};
        deleteStocks.forEach(stockData => {
            deleteStockMap[stockData.product_id] = stockData.stock;
        });

        //=========================== Here stop for new adding and delete for product update  ======================== //

        // === Validate  Original Stock with Purchase Quantity === //
        const originalProducts = orderData['original_products'];
        const validateStockResult = originalProducts.map((item => {
            const available = originalStockMap[item.id];

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

        // === Update Order After Product and Stock Validation  === //
        console.log("here is order update data after validation", orderId);
        console.log("here is original products", originalProducts);
        const updatedOrder = await Order.findOneAndUpdate(
            { id: orderId },
            { $set: { purchase_products: originalProducts } },
            { new: true, runValidators: true }
        );

        // === Update Stock here === // Case Only for Existing Products
        // === Substract and Update the  stock  db === //
        const updatedStocks = await updateStocksBulk(originalProducts.map(({ id, quantity }) => ({
            product_id: id,
            stockData: { stock: originalStockMap[id] - quantity }
        })));

        if (updatedStocks.modifiedCount !== originalProducts.length) {
            return Error("Failed to update all stocks after order create");
        }
        console.log("Here is updated order", updatedOrder);
        return updatedOrder;
    } catch (error) {
        throw error;
    }
}