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

    // For Update Order BulkOpertion is heavy as it's for multiple documents updated , and using updateOne for each operation is not a good practice here and $set/$push/$pull in one updateOne is not valid here , so pick to replace the whole doucument by updating all relating products and stay no touch to non-updated products

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const oldOrder = await getOrderById(orderId);

        const oldProductsMap = new Map();
        oldOrder.purchase_products.forEach(product => {
            oldProductsMap.set(product.id, product.quantity);
        });

        // ==== Get Original Products  ==== //
        const originalProducts = orderData['original_products'];

        // ====Get New Products  ==== //
        const newProducts = orderData['new_products'] ? orderData['new_products'] : [];

        // ====Get  Delete Products Ids  === //
        const deleteProductsIds = orderData['delete_products'] ?? [];

        //=== Validate Product Existence and if all Valide then get Stocks of those products ==== //
        const allStocks = await validateProductsAndGetStocks(originalProducts, newProducts, deleteProductsIds);
        console.log("Type of all stock", typeof allStocks);
        // === Stock Mapping === //
        const allStockMap = {};
        allStocks.forEach(stockData => {
            allStockMap[stockData.product_id] = stockData.stock;
        });

        // console.log("All Stock Map ", allStockMap);
        // === Validate  Original/New Products Quantity with  Stock  === //
        validateStockMapping(allStockMap, originalProducts, newProducts);

        // === Check Old Prdoucts has the all delete_products(ONLY for Delete Products) ===//
        checkDeleteProductsInOldOrder(oldProductsMap, deleteProductsIds);


        // =====  Update Order After Product and Stock Validation  ===== //
        const mappedOriginalProducts = originalProducts.map(product => {
            if (product.method === "SUB" && product.quantity > oldProductsMap.get(product.id)) {
                const error = Error(`Invalid substract quantity for product id ${product.id}`);
                error.statusCode = 400;
                throw error;
            }
            return {
                id: product.id,
                quantity: product.method === "ADD" ? product.quantity + oldProductsMap.get(product.id) : oldProductsMap.get(product.id) - product.quantity
            }
        });
        const mappedNewProducts = newProducts.map(p => ({ id: p.id, quantity: p.quantity }));

        const mappedProducts = prepareProductsForUpdate(oldOrder, mappedOriginalProducts, mappedNewProducts, deleteProductsIds);

        const updatedOrder = await Order.updateOne(
            { id: orderId },
            { $set: { purchase_products: Array.from(mappedProducts.values()) } },
            { session }
        );

        // === Check Delete Products From Updated Order Successfully === //
        checkDeleteProductsSuccessful(orderId, deleteProductsIds, session);

        // === Update Stock here === // Case Only for Existing Products
        stockToUpdate(originalProducts, newProducts, deleteProductsIds, allStockMap, oldProductsMap, session);

        await session.commitTransaction();
        return await getOrderById(orderId);
    } catch (error) {
        await session.abortTransaction();
        throw error;
    }
}

const getOrderById = async (orderId) => {
    const order = await Order.findOne({ id: orderId }).select('-__v -_id');
    if (!order) {
        const error = Error("Order not found");
        error.statusCode = 404;
        throw error;
    }
    return order;
};

const productsValidation = async (productIds, str) => {
    const validProducts = await findProductsByIds(productIds);
    if (validProducts.length !== productIds.length) {
        const error = Error("Invalid product id at " + str);
        error.statusCode = 400;
        throw error;
    }
    return validProducts;
};

const validateStockMapping = (allStockMap, ...stockLists) => {
    const mappedStocks = stockLists.flat().map(item => {
        const available = allStockMap[item.id];
        if (available === undefined) {
            return { "product_id": item.id, "valid": false, "message": "No Product" };
        }
        else if (available < item.quantity) {
            return { "product_id": item.id, "valid": false, "message": "Insufficient stock" };
        }

        return { "product_id": item.id, "valid": true };

    });
    //  mappedStocks;
    const invalids = mappedStocks.filter(result => !result.valid);
    if (invalids.length > 0) {
        const error = Error("Failed at stock checking");
        error.statusCode = 400;
        error.details = invalids;
        throw error;
    }
};

const checkDeleteProductsInOldOrder = (oldOrderMap, deleteProductsIds) => {
    const oldProductsIds = Array.from(oldOrderMap.keys());
    const hasAllDeleteProducts = deleteProductsIds.every(pid => oldProductsIds.includes(pid));
    if (!hasAllDeleteProducts) {
        const error = new Error("Invalid delete products");
        error.statusCode = 400;
        throw error;
    }
};

const prepareProductsForUpdate = (oldOrder, originalProducts, newProducts, deleteProductsIds) => {
    const productsMap = new Map();
    oldOrder.purchase_products.forEach(p => {
        productsMap.set(p.id, p);
    });

    originalProducts.forEach(p => {
        const old = productsMap.get(p.id);
        if (old === undefined) return;
        console.log("Here is old product from map for original products update", old);
        const plainOld = old.toObject ? old.toObject() : old;
        productsMap.set(p.id, { ...plainOld, quantity: p.quantity });
    });

    if (newProducts.length > 0) {
        newProducts.forEach(p => {
            productsMap.set(p.id, p);
        });
    }

    // === update for delete  === //
    if (deleteProductsIds.length > 0) {
        deleteProductsIds.forEach(id => {
            productsMap.delete(id);
        });
    }
    return productsMap;
};

const checkDeleteProductsSuccessful = async (orderId, deleteProductsIds, session) => {
    const updatedOrderProducts = await Order.findOne({ id: orderId }).session(session);
    if (deleteProductsIds.some(pid => updatedOrderProducts.purchase_products.map(p => p.id).includes(pid))) {
        const error = Error("Failed to delete products from order");
        error.statusCode = 400;
        throw error;
    }
};

const stockToUpdate = async (originalProducts, newProducts, deleteProductsIds, allStockMap, oldProductsMap, session) => {
    const stockToUpdate = new Map();

    originalProducts.forEach(({ id, quantity, method }) => {
        const updatedStock =
            method === "ADD" ? allStockMap[id] - quantity : allStockMap[id] + quantity;
        stockToUpdate.set(id, {
            product_id: id,
            stockData: { stock: updatedStock }
        });

    });

    newProducts.forEach(({ id, quantity }) => {
        stockToUpdate.set(id, {
            product_id: id,
            stockData: { stock: allStockMap[id] - quantity }
        })
    })

    // === Return Stock for Update-Delete Products === //
    deleteProductsIds.forEach(pid => {
        stockToUpdate.set(pid, {
            product_id: pid,
            stockData: { stock: allStockMap[pid] + oldProductsMap.get(pid) }
        })
    });
    const updatedStocks = await updateStocksBulk(Array.from(stockToUpdate.values()), session);
    return updatedStocks;
};

const validateProductsAndGetStocks = async (originalProducts, newProducts, deleteProductsIds) => {
    //  === Validate Products Existence ==== //
    const validOriginalProducts = await productsValidation(originalProducts.map(product => product.id), "original products");
    const validNewProducts = await productsValidation(newProducts.map(product => product.id), "new products");
    const validDeleteProducts = await productsValidation(deleteProductsIds, "delete products");

    //===  Get  Products Ids from Valid Products === //
    const validOriginalProductsIds = validOriginalProducts.map(product => product.id);
    const validNewProductsIds = validNewProducts.map(product => product.id);
    const validDeleteProductsIds = validDeleteProducts.map(product => product.id);

    // === Fetch Stocks for Original, New, Delete Products === //
    const originalStocks = await findStocksByProductIds(validOriginalProductsIds);
    const newStocks = await findStocksByProductIds(validNewProductsIds);
    const deleteStocks = await findStocksByProductIds(validDeleteProductsIds);

    return [...originalStocks, ...newStocks, ...deleteStocks];
};