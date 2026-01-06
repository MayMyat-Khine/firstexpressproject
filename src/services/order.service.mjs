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
        console.log("Order Create Before Save", newOrder);
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
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        console.log("Here is order id", orderId);
        console.log("here is order update data", orderData);

        const oldOrder = await Order.findOne({ id: orderId });
        const oldProductsMap = new Map();
        oldOrder.purchase_products.forEach(product => {
            oldProductsMap.set(product.id, product.quantity);
        });
        console.log("Here is old products map", oldProductsMap);
        // ==== Original Products Validation ==== //
        const originalProducts = orderData['original_products'];
        const originalProductsIds = originalProducts.map(product => product.id);

        // // ==== New Products Validation ==== //
        // const newProductsIds = orderData['new_products'] ? orderData['new_products'].map(product => product.id) : [];

        // // ==== Delete Products Validation === //
        console.log("Here is order data for delete products", orderData['delete_products']);
        const deleteProductsIds = orderData['delete_products'] ?? [];

        const validOriginalProducts = await findProductsByIds(originalProductsIds);
        if (validOriginalProducts.length !== originalProductsIds.length) {
            const error = Error("Invalid product id at original products");
            error.statusCode = 400;
            throw error;
        }

        // const validNewProducts = await findProductsByIds(newProductsIds);
        // if (validNewProducts.length !== newProductsIds.length) {
        //     const error = Error("Invalid product id");
        //     error.statusCode = 400;
        //     throw error;
        // }

        console.log("Here is delete products ids", deleteProductsIds);
        const validDeleteProducts = await findProductsByIds(deleteProductsIds);
        console.log("Here is valid delete products", validDeleteProducts);
        if (validDeleteProducts.length !== deleteProductsIds.length) {
            const error = Error("Invalid product id at delete products");
            error.statusCode = 400;
            throw error;
        }

        const validOriginalProductsIds = validOriginalProducts.map(product => product.id);
        // const validNewProductsIds = validNewProducts.map(product => product.id);
        const validDeleteProductsIds = validDeleteProducts.map(product => product.id);

        const originalStocks = await findStocksByProductIds(validOriginalProductsIds);
        // const newStocks = await findStocksByProductIds(validNewProductsIds);
        const deleteStocks = await findStocksByProductIds(validDeleteProductsIds);
        const allStocks = [...originalStocks, ...deleteStocks];

        // === Stock Mapping === //
        const originalStockMap = {};
        allStocks.forEach(stockData => {
            originalStockMap[stockData.product_id] = stockData.stock;
        });
        console.log("Here is original stock map", originalStockMap);
        // const newStockMap = {};
        // newStocks.forEach(stockData => {
        //     newStockMap[stockData.product_id] = stockData.stock;
        // });
        // const deleteStockMap = {};
        // deleteStocks.forEach(stockData => {
        //     deleteStockMap[stockData.product_id] = stockData.stock;
        // });

        //=========================== Here stop for new adding and delete for product update  ======================== //

        // === Validate  Original Stock with Purchase Quantity === //

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
        // === Check Old Prdoucts has the all delete_products(ONLY for Delete Products) ===//
        const oldProductsIds = Array.from(oldProductsMap.keys());
        console.log("Here is old products ids", oldProductsIds);
        console.log("Here is validDeleteProductsIds", validDeleteProductsIds);

        const hasAllDeleteProducts = validDeleteProductsIds.every(pid => oldProductsIds.includes(pid));
        if (!hasAllDeleteProducts) {
            const error = new Error("Invalid delete products");
            error.statusCode = 400;
            throw error;
        }

        // =====  Update Order After Product and Stock Validation  ===== //
        console.log("here is order update data after validation", orderId);
        console.log("here is original products", originalProducts);

        const stockToUpdate = {};
        const mappedProducts = originalProducts.map(product => {
            console.log("Here is mapped product", product);
            if (product.method === "SUB" && product.quantity > oldProductsMap.get(product.id)) {
                const error = Error(`Invalid substract quantity for product id ${product.id}`);
                error.statusCode = 400;
                throw error;
            }
            if (product.method === "ADD") {
                stockToUpdate[product.id] = oldProductsMap.get(product.id) + product.quantity;
                console.log("Here is ADD ", oldProductsMap.get(product.id) + product.quantity);
            } else {
                stockToUpdate[product.id] = oldProductsMap.get(product.id) - product.quantity;
                console.log("Here is SUB ", oldProductsMap.get(product.id) - product.quantity);
            }
            return {
                id: product.id,
                quantity: product.method === "ADD" ? product.quantity + oldProductsMap.get(product.id) : oldProductsMap.get(product.id) - product.quantity
            }
        });
        const bulkOps = mappedProducts.map(p => ({

            updateOne: {
                filter: { id: orderId, "purchase_products.id": p.id },
                update: { $set: { "purchase_products.$.quantity": p.quantity } }
            }
        }));


        const updatedOrder = await Order.bulkWrite(bulkOps, { session });

        // === update for delete  === //
        console.log("Here is valid delete products ids", validDeleteProductsIds);
        const deleteBulkOps = await Order.updateOne(
            { id: orderId, },
            {
                $pull: {
                    purchase_products: { id: { $in: validDeleteProductsIds } }
                }
            }, { session });

        console.log("Here is delete bulk ops result", deleteBulkOps);
        if (deleteBulkOps.modifiedCount !== validDeleteProductsIds.length) {
            const error = Error("Failed to delete all products from order");
            error.statusCode = 400;
            throw error;
        }

        // === Update Stock here === // Case Only for Existing Products
        // === Substract and Update the  stock  db === //
        const updatedStocks = await updateStocksBulk(originalProducts.map(({ id, quantity, method }) => ({
            product_id: id,
            stockData: { stock: method === "ADD" ? originalStockMap[id] - quantity : originalStockMap[id] + quantity }
        })), session);

        if (updatedStocks.modifiedCount !== originalProducts.length) {
            return Error("Failed to update all stocks after order create");
        }


        // === Return Stock for Update-Delete Products === //

        console.log("Here is originalStockMap ", oldProductsMap);
        console.log("Here is originalStockMap[p01] ", oldProductsMap.get("product01"));
        console.log("Here is originalStockMap ", originalStockMap);
        console.log("Here is originalStockMap p01", originalStockMap["product01"]);
        const returnStocks = await updateStocksBulk(validDeleteProductsIds.map(pid => ({


            product_id: pid,
            stockData: { stock: originalStockMap[pid] + oldProductsMap.get(pid) }

        })), session);
        if (returnStocks.modifiedCount !== validDeleteProductsIds.length) {
            return Error("Failed to return stocks for deleted products after order update");
        }
        // ========================================== //
        console.log("Here is return stocks result", returnStocks);


        console.log("Here is updated order", updatedOrder);
        await session.commitTransaction();
        return updatedOrder;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    }
}