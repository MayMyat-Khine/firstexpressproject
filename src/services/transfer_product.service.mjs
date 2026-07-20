import mongoose from "mongoose";
import { getCachedBranchIdsRepo } from '../repositories/branch.repository.mjs';
import { findByBranchId } from "../services/branch.service.mjs";
import { findUserById } from "../services/user.service.mjs";
import { getProductsByBranch } from "./product.service.mjs";
import AppErrors from "../utils/appErrors.mjs";
import { createTransferProductsRepo, getAllRecordsRepo } from "../repositories/transfer_product.repository.mjs";
import { v4 as uuidv4 } from "uuid";
import { updateStocksBulk, updateStocksBulkWitStockId, getStockByProductIdAndBranchId } from "../services/stock.service.mjs";
import { findProductById } from "./product.service.mjs";

const validateBranches = async (branchIds) => {
    await findByBranchId(branchIds[0]);
    await findByBranchId(branchIds[1]);
    return true;
}

const validateProductsOnReceiverBranch = async (branchId, transferProducts) => {
    try {
        const products = await getProductsByBranch(branchId);

        if (products.length === 0) {
            throw new AppErrors("PRODUCTS NOT FOUND", 404);
        }
        const productIds = new Set(products.map(p => p.id));
        const invalidTransferProducts = transferProducts.filter(tp => !productIds.has(tp.id));
        if (invalidTransferProducts.length > 0) {

            const invalidIDs = invalidTransferProducts.map(p => p.id);
            throw new AppErrors(`Some of the products [ ${invalidIDs} ] are not created at receiver branch`, 400);
        }
        const stocksWithStockID = [];

        for (const tp of transferProducts) {

            const foundStock = await getStockByProductIdAndBranchId(branchId, tp.id);

            stocksWithStockID.push({
                "id": foundStock.id,
                "stock": foundStock.stock,
                "product_id": foundStock.product_id

            });
        }

        return stocksWithStockID;
    } catch (error) {
        throw error;
    }
};

const validateProductsOnSenderBranchAndGetStocks = async (branchId, transferProducts) => {
    try {
        const tpMap = new Map();
        transferProducts.forEach(tp => {
            tpMap.set(tp.id, tp.quantity);
        });

        const productsOnBranch = await getProductsByBranch(branchId);
        console.log(JSON.stringify(productsOnBranch, null, 2)); // here can have stock directly rather than get from StockDB again
        if (productsOnBranch.length === 0) {
            throw new AppErrors("PRODUCTS NOT FOUND", 404);
        }
        const productIds = new Set(productsOnBranch.map(p => p.id));
        // check original-P and transfer-p
        const xinvalidProducts = [...tpMap.keys()].filter(tpid => !productIds.has(tpid));
        if (xinvalidProducts.length > 0) {
            throw new AppErrors(`Some transfer products ${xinvalidProducts} not found`, 404);
        }
        const stocks = [];
        const stocksWithStockID = [];

        for (const tp of transferProducts) {
            const foundStock = await getStockByProductIdAndBranchId(branchId, tp.id);

            stocks.push({
                "id": foundStock.product_id,
                "stock": foundStock.stock
            });
            stocksWithStockID.push({
                "id": foundStock.id,
                "stock": foundStock.stock,
                "product_id": foundStock.product_id

            });
        }

        const stockMap = new Map();
        stocks.forEach(s => stockMap.set(s.id, s.stock));

        const invalidStocks = transferProducts.filter(p => {
            const originalStock = stockMap.get(p.id) ?? 0;
            return p.quantity > originalStock;
        }).map(p => p.id);

        if (invalidStocks.length !== 0) {
            throw new AppErrors(`Transfer Quantity of products [ ${invalidStocks} ]  exceed than it's stock`, 400);
        }
        return stocksWithStockID;
    } catch (error) {
        throw error;
    }
}

const validateUser = async (userId) => {
    const foundUser = await findUserById(userId);
    if (!foundUser) {
        throw new AppErrors(`User ${userId} is not found`, 404);
    }
    return true;
}

export const createTransferProductsService = async (createTransferProuctsData) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const xValidUser = await validateUser(createTransferProuctsData['created_by']);
        const xValidBranches = await validateBranches([createTransferProuctsData['sender_branch_id'], createTransferProuctsData['receiver_branch_id']]);
        const senderStock = await validateProductsOnSenderBranchAndGetStocks(createTransferProuctsData['sender_branch_id'], createTransferProuctsData['products']);
        const recieveStock = await validateProductsOnReceiverBranch(createTransferProuctsData['receiver_branch_id'], createTransferProuctsData['products']);
        if (xValidUser && xValidBranches) {
            const savedData = await createTransferProductsRepo({ id: uuidv4(), ...createTransferProuctsData }, session);


            // transfer product map
            const tpMap = new Map();
            createTransferProuctsData['products'].forEach(tp => {
                tpMap.set(tp.id, tp.quantity);
            });
            // for sender branch
            let stockForSender = {};
            let stockForReceiver = {};
            senderStock.forEach(s => {
                stockForSender[s.id] = s.stock - tpMap.get(s.product_id);

            });
            recieveStock.forEach(s => {
                stockForReceiver[s.id] = tpMap.get(s.product_id) + s.stock;

            });

            const updatedStockForSender = await updateStocksBulkWitStockId(Object.entries(stockForSender).map(
                ([id, stock]) => ({
                    id,
                    stockData: {
                        stock
                    }
                })
            ), session);
            const updatedStockForReceiver = await updateStocksBulkWitStockId(Object.entries(stockForReceiver).map(
                ([id, stock]) => ({
                    id,
                    stockData: {
                        stock
                    }
                })
            ), session);

            const results = await Promise.all(
                [...tpMap.keys()].map(key => findProductById(key))
            );
            await session.commitTransaction();

            return results;
        }
        await session.commitTransaction();

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
}

export const getAllRecords = async () => {
    return await getAllRecordsRepo();
}