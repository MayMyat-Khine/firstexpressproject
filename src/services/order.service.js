import mongoose from 'mongoose';
import { Order } from "../mongoose/schemas/order.js";
import { findUserById } from "./user.service.js";
import { findProductById, findProductsByIds, getProductsByProductIdAndBranch } from './product.service.js';
import { findStocksByProductIds, updateStock, updateStocksBulk } from './stock.service.js';
import { findByBranchId } from './branch.service.js';
import AppErrors from '../utils/appErrors.js';
import * as orderRepo from "../repositories/order.repository.js";
import { v4 as uuidv4 } from "uuid";
import { getCustomerById } from './customer.service.js';
import { getCurrencyRateByCode } from './currency_rates.service.js';

// assume merchant data is valid here
// check merchant id and customer id are valid
// check product data  and stock data is valid
// check the purchase stock is lower than the stock of the product-stock
// save the order create
// substract stock and update stock-db
export const createOrderService = async (orderData, customerId) => {
    console.log("cust id", customerId);
    console.log("Raw Order Data", orderData);
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // === Validate Customer === //
        const customer = await getCustomerById(customerId);

        // === Validate Branch ==== //
        const branch = await findByBranchId(orderData['branch_id']);

        // === Validate Products ===//
        const productIds = orderData['purchase_products'].map(product => product.id);
        const validProducts = await getProductsByProductIdAndBranch(orderData['branch_id'], productIds);
        // console.log(JSON.stringify(validProducts, null, 2));
        if (validProducts.length !== productIds.length) {
            throw new AppErrors('One or more invalid products.', 400);
        }

        const validProductsIds = validProducts.map(product => product.id);

        // === Resolve Currency Rate from CurrencyRates === //
        const currencyRate = await getCurrencyRateByCode(orderData['currency']);
        if (!currencyRate) {
            throw new AppErrors(`Currency ${orderData['currency']} is not supported`, 400);
        }
        const rate = currencyRate.rate;

        // === Get Related Price of Product by Currency , fallback : rate * USD price === //
        const resolveProductPrice = (product, currency, currencyRate) => {
            const relatedPrice = product.price.find(p => p.currency === currency);
            if (relatedPrice !== undefined) {
                return relatedPrice.amount;
            }
            const usdPrice = product.price.find(p => p.currency === "USD");
            if (!usdPrice) {
                throw new AppErrors(`No price found for product ${product.id} in ${currency}`, 400);
            }
            return usdPrice.amount * currencyRate;
        };

        // === Get Stocks of Products === //
        const stocks = await findStocksByProductIds(orderData['branch_id'], validProductsIds);
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
            const invalids = validateStockResultForOriginalProducts.filter(result => !result.valid).map(p => p.product_id);
            throw new AppErrors(`[${invalids}] has insufficient stocks`, 400)
        }

        // === Create order after all validation === // 
        const orderProducts = orderData["purchase_products"].map(item => {

            const purchasedProduct = validProducts.find(p => p.id === item.id);
            const unitPrice = resolveProductPrice(purchasedProduct, orderData['currency'], rate);

            return {
                id: item.id,

                quantity: item.quantity,
                price: unitPrice,
                subtotal: unitPrice * item.quantity
            }
        });
        const totalAmount = orderProducts.reduce((sum, p) => sum + p.subtotal, 0);
        const uid =
            `OSV-${uuidv4().replace(/-/g, '').slice(0, 13)}`;

        const finalOrderObj = { ...orderData, id: uid, customer_id: customerId, purchase_products: orderProducts, subtotal: totalAmount, discount: 0, total_amount: totalAmount, rate };
        console.log("Final Order Obj ", finalOrderObj)
        const savedOrder = await orderRepo.createOrderRepo(finalOrderObj, session);

        // === Substract and Update the  Stock  DB === //
        console.log("Stock map", stockMap)
        const updatedStocks = await updateStocksBulk(purchaseProducts.map(({ id, quantity }) => ({
            branchId: orderData['branch_id'],
            product_id: id,
            stockData: { stock: stockMap[id] - quantity }
        })), session);

        if (updatedStocks.modifiedCount !== purchaseProducts.length) {
            throw new AppErrors("Failed to update all stocks after order create", 400);
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

const checkProductUniqueness = async (orderId, orderData) => {
    const oldOrder = await getOrderById(orderId);
    const oldProductsMap = new Map();
    oldOrder.purchase_products.forEach(product => {
        oldProductsMap.set(product.id, product.quantity);
    });

    // ==== Get Original/New Products  & Delete ProductsIds ==== //
    const originalProducts = orderData['original_products'] ? orderData['original_products'] : [];
    const newProducts = orderData['new_products'] ? orderData['new_products'] : [];
    const deleteProductsIds = orderData['delete_products'] ?? [];


    const oPIds = new Set(originalProducts.map(p => p.id));
    const nPIds = new Set(newProducts.map(p => p.id));
    const isIncludedForOriginal = [...oPIds].every(item => oldProductsMap.has(item));
    if (!isIncludedForOriginal) {
        const error = Error("You are updating a product that is not in your order");
        error.statusCode = 400;
        throw error;
    }

    const isIncludedForDelete = [...deleteProductsIds].every(p => oldProductsMap.has(p));
    if (!isIncludedForDelete) {
        const error = Error("You are deleting a product that is not in your order");
        error.statusCode = 400;
        throw error;
    }

    const isIncludedForNew = [...nPIds].some(item => oldProductsMap.has(item));
    if (isIncludedForNew) {
        const error = Error("You are adding a product that is already in your order");
        error.statusCode = 400;
        throw error;
    }
    return { originalProducts, newProducts, deleteProductsIds };
};

// === For: Current only update the Status and Notes === //
// export const updateOrder = async (orderId, orderData) => {
//     // here no case for PRODUCT HAD BEEN DELETED AND STOCK ADDING AS RETURN STOCK 
//     // but in real case need to handle that 
//     // check product presence
//     // check stock availability
//     // update order {session}
//     // update stock {session}

//     // For Update Order BulkOpertion is heavy as it's for multiple documents updated , and using updateOne for each operation is not a good practice here and $set/$push/$pull in one updateOne is not valid here , so pick to replace the whole doucument by updating all relating products and stay no touch to non-updated products

//     const session = await mongoose.startSession();
//     try {

//         session.startTransaction();
//         const oldOrder = await getOrderById(orderId);
//         const oldProductsMap = new Map();
//         oldOrder.purchase_products.forEach(product => {
//             oldProductsMap.set(product.id, product.quantity);
//         });
//         // ====Validate The Products Uniqueness and  Get Original/New Products  & Delete ProductsIds ==== //
//         const { originalProducts, newProducts, deleteProductsIds } = await checkProductUniqueness(orderId, orderData);

//         //=== Validate Product Existence and if all Valide then get Stocks of those products ==== //
//         const allStocks = await validateProductsAndGetStocks(originalProducts, newProducts, deleteProductsIds);

//         // === Stock Mapping === //
//         const allStockMap = {};
//         allStocks.forEach(stockData => {
//             allStockMap[stockData.product_id] = stockData.stock;
//         });

//         // === Validate  Original/New Products Quantity with  Stock  === //
//         validateStockMapping(allStockMap, originalProducts, newProducts);
//         // === Check Old Prdoucts has the all delete_products(ONLY for Delete Products) ===//
//         checkDeleteProductsInOldOrder(oldProductsMap, deleteProductsIds);
//         // =====  Update Order After Product and Stock Validation  ===== //
//         const mappedOriginalProducts = originalProducts.map(product => {
//             if (product.method === "SUB" && product.quantity > oldProductsMap.get(product.id)) {
//                 const error = Error(`Invalid substract quantity for product id ${product.id} `);
//                 error.statusCode = 400;
//                 throw error;
//             }
//             return {
//                 id: product.id,
//                 quantity: product.method === "ADD" ? product.quantity + oldProductsMap.get(product.id) : oldProductsMap.get(product.id) - product.quantity
//             }
//         });
//         const mappedNewProducts = newProducts.map(p => ({ id: p.id, quantity: p.quantity }));
//         const mappedProducts = prepareProductsForUpdate(oldOrder, mappedOriginalProducts, mappedNewProducts, deleteProductsIds);
//         await Order.updateOne(
//             { id: orderId },
//             { $set: { purchase_products: Array.from(mappedProducts.values()) } },
//             // { session }
//         );

//         // === Check Delete Products From Updated Order Successfully === //
//         checkDeleteProductsSuccessful(orderId, deleteProductsIds, session);

//         // === Update Stock here === // Case Only for Existing Products
//         stockToUpdate(originalProducts, newProducts, deleteProductsIds, allStockMap, oldProductsMap, session);

//         await session.commitTransaction();
//         const updatedOrder = await getOrderById(orderId);
//         return updatedOrder;
//     } catch (error) {
//         await session.abortTransaction();
//         throw error;
//     } finally {
//         session.endSession();
//     }

// }

const statusFlow = {
    Pending: ["Confirmed", "Cancelled"],
    Confirmed: ["Preparing", "Cancelled"],
    Preparing: ["Ready", "Cancelled"],
    Ready: ["Completed", "Cancelled"],
    Completed: [],
    Cancelled: []
};

const canUpdateStatus = (currentStatus, newStatus) => {
    return statusFlow[currentStatus]?.includes(newStatus);

};
export const updateOrder = async (orderId, orderData) => {

    const oldOrder = await getOrderById(orderId);

    if (!canUpdateStatus(oldOrder.status, orderData.status)) {
        throw new AppErrors(
            `Cannot change order status from ${oldOrder.status} to ${orderData.status}`,
            400
        );
    }
    const updatedOrder = await orderRepo.updateOrderRepo(orderId, orderData);

    return updatedOrder;
}

export const getOrders = async ({ page, limit, search, branchId, customerId, status }) => {
    const safePage = page != null ? Number(page) : 1;
    const safeLimit = limit != null ? Math.min(Number(limit), 100) : 20;
    return await orderRepo.getOrdersRepo({ page: safePage, limit: safeLimit, search, branchId, customerId, status });
}

export const getOrdersByCustomer = async (customerId, { page, limit, search, status, payment_method, createdAt }) => {
    const safePage = page != null ? Number(page) : 1;
    const safeLimit = limit != null ? Math.min(Number(limit), 100) : 20;
    return await orderRepo.getOrdersByCustomerRepo(customerId, { page: safePage, limit: safeLimit, search, status, payment_method, createdAt });
}



export const getOrderById = async (id) => {
    console.log("order id", id)
    const order = await orderRepo.getOrderByIdRepo(id);
    if (!order) {
        throw new AppErrors(`Order id ${id} is not found`, 404)
    }
    return order;
};

export const getMyOrderById = async (customerId, id) => {
    const order = await orderRepo.getMyOrderByIdRepo(id, customerId);
    if (!order) {
        throw new AppErrors(`Order id ${id} is not found`, 404)
    }

    return order;
};

export const getOrderByBranch = async (bid) => {
    const orders = await orderRepo.getOrderByBranchRepo(bid);
    if (!orders) {
        throw new AppErrors(`Orders on Branch ${id} are not found`, 404)
    }
    return orders;
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
        else if (available !== undefined) {
            if (item.method === "ADD" && available < item.quantity) {
                return { "product_id": item.id, "valid": false, "message": "Insufficient stock" };
            }

        }

        return { "product_id": item.id, "valid": true };

    });
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

// const stockToUpdate = async (originalProducts, newProducts, deleteProductsIds, allStockMap, oldProductsMap, session) => {
//     const stockToUpdate = new Map();

//     originalProducts.forEach(({ id, quantity, method }) => {
//         const updatedStock =
//             method === "ADD" ? allStockMap[id] - quantity : allStockMap[id] + quantity;
//         stockToUpdate.set(id, {
//             product_id: id,
//             stockData: { stock: updatedStock }
//         });

//     });

//     newProducts.forEach(({ id, quantity }) => {
//         stockToUpdate.set(id, {
//             product_id: id,
//             stockData: { stock: allStockMap[id] - quantity }
//         })
//     })

//     // === Return Stock for Update-Delete Products === //
//     deleteProductsIds.forEach(pid => {
//         stockToUpdate.set(pid, {
//             product_id: pid,
//             stockData: { stock: allStockMap[pid] + oldProductsMap.get(pid) }
//         })
//     });
//     const updatedStocks = await updateStocksBulk(Array.from(stockToUpdate.values()), session);
//     return updatedStocks;
// };

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