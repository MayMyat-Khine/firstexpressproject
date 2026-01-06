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
        const validateStockResultForOriginalProducts = purchaseProducts.map((item => {
            const available = stockMap[item.id];

            if (available === undefined) {
                return { "product_id": item.id, "valid": false, "message": "No Product" };
            }
            else if (available < item.quantity) {
                return { "product_id": item.id, "valid": false, "message": "Insufficient stock" };
            }

            return { "product_id": item.id, "valid": true };

        }));

        const hasInvalid = validateStockResultForOriginalProducts.some(result => !result.valid);
        if (hasInvalid) {
            const invalids = validateStockResultForOriginalProducts.filter(result => !result.valid);
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

        // ==== Original Products Validation ==== //
        const originalProducts = orderData['original_products'];
        const originalProductsIds = originalProducts.map(product => product.id);

        // ==== New Products Validation ==== //
        const newProducts = orderData['new_products'] ? orderData['new_products'] : [];
        const newProductsIds = newProducts.map(product => product.id);

        // ==== Delete Products Validation === //
        const deleteProductsIds = orderData['delete_products'] ?? [];

        //  === Validate Products Existence ==== //
        const validOriginalProducts = await findProductsByIds(originalProductsIds);
        if (validOriginalProducts.length !== originalProductsIds.length) {
            const error = Error("Invalid product id at original products");
            error.statusCode = 400;
            throw error;
        }

        const validNewProducts = await findProductsByIds(newProductsIds);
        if (validNewProducts.length !== newProductsIds.length) {
            const error = Error("Invalid product id at new products");
            error.statusCode = 400;
            throw error;
        }

        const validDeleteProducts = await findProductsByIds(deleteProductsIds);
        if (validDeleteProducts.length !== deleteProductsIds.length) {
            const error = Error("Invalid product id at delete products");
            error.statusCode = 400;
            throw error;
        }

        //===  Get  Products Ids from Valid Products === //
        const validOriginalProductsIds = validOriginalProducts.map(product => product.id);
        const validNewProductsIds = validNewProducts.map(product => product.id);
        const validDeleteProductsIds = validDeleteProducts.map(product => product.id);


        // === Fetch Stocks for Original, New, Delete Products === //
        const originalStocks = await findStocksByProductIds(validOriginalProductsIds);
        const newStocks = await findStocksByProductIds(validNewProductsIds);
        const deleteStocks = await findStocksByProductIds(validDeleteProductsIds);
        const allStocks = [...originalStocks, ...deleteStocks, ...newStocks];
        console.log("Here is all stocks for update order", allStocks);

        // === Stock Mapping === //
        const allStockMap = {};
        allStocks.forEach(stockData => {
            allStockMap[stockData.product_id] = stockData.stock;
        });
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

        const validateStockResultForOriginalProducts = originalProducts.map((item => {
            const available = allStockMap[item.id];

            if (available === undefined) {
                return { "product_id": item.id, "valid": false, "message": "No Product" };
            }
            else if (available < item.quantity) {
                return { "product_id": item.id, "valid": false, "message": "Insufficient stock" };
            }

            return { "product_id": item.id, "valid": true };

        }));

        const validateStockResultForNewProducts = newProducts.map((item => {
            const available = allStockMap[item.id];

            if (available === undefined) {
                return { "product_id": item.id, "valid": false, "message": "No Product" };
            }
            else if (available < item.quantity) {
                return { "product_id": item.id, "valid": false, "message": "Insufficient stock" };
            }

            return { "product_id": item.id, "valid": true };

        }));

        const hasInvalid = validateStockResultForOriginalProducts.some(result => !result.valid) || validateStockResultForNewProducts.some(result => !result.valid);
        if (hasInvalid) {
            const invalids = validateStockResultForOriginalProducts.filter(result => !result.valid);
            const error = Error("Failed at stock checking");
            error.statusCode = 400;
            error.details = invalids;
            throw error;
        }

        // === Check Old Prdoucts has the all delete_products(ONLY for Delete Products) ===//
        const oldProductsIds = Array.from(oldProductsMap.keys());
        const hasAllDeleteProducts = validDeleteProductsIds.every(pid => oldProductsIds.includes(pid));
        if (!hasAllDeleteProducts) {
            const error = new Error("Invalid delete products");
            error.statusCode = 400;
            throw error;
        }

        // =====  Update Order After Product and Stock Validation  ===== //
        const stockToUpdate = {};
        var mappedProducts = {};
        mappedProducts = originalProducts.map(product => {
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
        // const mappedNewProducts = newProducts.length > 0 ? mappedProducts.concat(newProducts.map(p => { return { id: p.id, quantity: p.quantity } })) : mappedProducts;
        const mappedNewProducts = newProducts.map(p => ({ id: p.id, quantity: p.quantity }));
        console.log("Here is mapped products for order update", mappedProducts);

        const bulkOps = mappedProducts.map(p => ({

            updateOne: {
                filter: { id: orderId, "purchase_products.id": p.id },
                update: { $set: { "purchase_products.$.quantity": p.quantity } },

            }
        }));
        const updatedOrder = await Order.bulkWrite(bulkOps, { session });

        if (mappedNewProducts.length > 0) {
            // bulkOps.push({
            //     updateOne: {
            //         filter: { id: orderId },
            //         update: { $push: { purchase_products: { $each: mappedNewProducts } } },
            //     }
            // });
            const updateNewProducts = await Order.updateOne(
                { id: orderId },
                { $push: { purchase_products: { $each: mappedNewProducts } } },
                { session }
            );
            console.log("Here is update new products result", updateNewProducts);
        }



        // === update for delete  === //
        const deleteBulkOps = await Order.updateOne(
            { id: orderId, },
            {
                $pull: {
                    purchase_products: { id: { $in: validDeleteProductsIds } }//validDeleteProductsIds
                }
            }, { session });
        console.log("Here is delete bulk ops result", deleteBulkOps);
        console.log("Here is valid delete products ids", validDeleteProductsIds);
        const updatedOrderProducts = await Order.findOne({ id: orderId }).session(session);
        console.log("Here is updated order products ids", updatedOrderProducts.purchase_products.map(p => p.id));

        if (validDeleteProductsIds.some(pid => updatedOrderProducts.purchase_products.map(p => p.id).includes(pid))) {
            const error = Error("Failed to delete products from order");
            error.statusCode = 400;
            throw error;
        }


        // === Update Stock here === // Case Only for Existing Products
        // === Substract and Update the  stock  db === //
        const updatedStocks = await updateStocksBulk(originalProducts.map(({ id, quantity, method }) => ({
            product_id: id,
            stockData: { stock: method === "ADD" ? allStockMap[id] - quantity : allStockMap[id] + quantity }
        })), session);
        const updateForNewProductsStocks = await updateStocksBulk(newProducts.map(({ id, quantity }) => {
            return {
                product_id: id,
                stockData: { stock: allStockMap[id] - quantity }
            }
        }));

        if (updatedStocks.modifiedCount !== originalProducts.length || updateForNewProductsStocks.modifiedCount !== newProducts.length) {
            return Error("Failed to update all stocks after order create");
        }


        // === Return Stock for Update-Delete Products === //


        const returnStocks = await updateStocksBulk(validDeleteProductsIds.map(pid => ({


            product_id: pid,
            stockData: { stock: allStockMap[pid] + oldProductsMap.get(pid) }

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