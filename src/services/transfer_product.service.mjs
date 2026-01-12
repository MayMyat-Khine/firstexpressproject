import mongoose from "mongoose";
import { getCachedBranchIdsRepo } from '../repositories/branch.repository.mjs';
import { getUsersRepo } from "../repositories/user.repository.mjs";
import { getProductsOnBranchRepo } from "../repositories/product.repostiory.mjs";
import AppErrors from "../utils/appErrors.mjs";
import { createTransferProductsRepo } from "../repositories/transfer_product.repository.mjs";
import { getStocksOnBranchRepo } from '../repositories/stock.repository.mjs';
import { v4 as uuidv4 } from "uuid";
import { updateStocksBulk, updateStocksBulkWitStockId } from "../services/stock.service.mjs";

const validateBranches = async (branchIds) => {
    try {
        const branches = await getCachedBranchIdsRepo();
        //here lets check here if there is no branches data
        if (branches.length === 0) {//branches === null || branches === undefined
            throw new AppErrors("BRANCHES NOT FOUND", 404);
        }
        const xValid = [...branchIds].every(id => branches.includes(id));
        if (!xValid) {
            throw new AppErrors("One of the Branch ID is not found", 404);
        }
        return true;
    } catch (error) {
        throw error;
    }
}

const validateProductsOnReceiverBranch = async (branchId, transferProducts) => {
    try {
        const products = await getProductsOnBranchRepo(branchId);
        if (products.length === 0) {
            throw new AppErrors("PRODUCTS NOT FOUND", 404);
        }
        const productIds = new Set(products.map(p => p.id));
        const invalidTransferProducts = transferProducts.filter(tp => !productIds.has(tp.id));
        if (invalidTransferProducts.length > 0) {
            console.log("INvalid product on receiver branch ", invalidTransferProducts);
            const invalidIDs = invalidTransferProducts.map(p => p.id);
            throw new AppErrors(`Some of the products [ ${invalidIDs} ] are not created at receiver branch`, 400);
        }
        const stocksWithStockID = [];
        for (const tp of transferProducts) {
            const foundStock = await getStocksOnBranchRepo(branchId, tp.id);

            stocksWithStockID.push({
                "id": foundStock[0].id,
                "stock": foundStock[0].stock,
                "product_id": foundStock[0].product_id

            });
        }

        return stocksWithStockID;
    } catch (error) {
        throw error;
    }
};

const validateProductsOnSenderBranchAndGetStocks = async (branchId, transferProducts) => {
    try {
        console.log("Transfer Products ", transferProducts);
        const tpMap = new Map();
        transferProducts.forEach(tp => {
            tpMap.set(tp.id, tp.quantity);
        });

        const products = await getProductsOnBranchRepo(branchId);
        if (products.length === 0) {
            throw new AppErrors("PRODUCTS NOT FOUND", 404);
        }
        const productIds = new Set(products.map(p => p.id));
        // check original-P and transfer-p
        const xinvalidProducts = [...tpMap.keys()].filter(tpid => !productIds.has(tpid));
        if (xinvalidProducts.length > 0) {
            throw new AppErrors("SOME TRANSFER PRODUCTS NOT FOUND", 400);
        }

        const stocks = [];
        const stocksWithStockID = [];
        for (const tp of transferProducts) {
            const foundStock = await getStocksOnBranchRepo(branchId, tp.id);
            stocks.push({
                "id": foundStock[0].product_id,
                "stock": foundStock[0].stock
            });
            stocksWithStockID.push({
                "id": foundStock[0].id,
                "stock": foundStock[0].stock,
                "product_id": foundStock[0].product_id

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
        console.log("Stock ", stocksWithStockID);
        return stocksWithStockID;
    } catch (error) {
        throw error;
    }
}

const validateUser = async (userId) => {
    try {
        const users = await getUsersRepo();
        if (users.length === 0) {
            throw new AppErrors("USERS NOT FOUND", 404);
        }
        const xValid = users.map(user => user.id).includes(userId);
        if (!xValid) {
            throw new AppErrors("User is not found", 404);
        }
        return true;
    } catch (error) {
        throw error;
    }
}

export const createTransferProductsService = async (createTransferProuctsData) => {
    console.log("createTransferProuctsData ", createTransferProuctsData);
    try {
        const xValidUser = await validateUser(createTransferProuctsData['created_by']);
        const xValidBranch = await validateBranches([createTransferProuctsData['sender_branch_id'], createTransferProuctsData['receiver_branch_id']]);
        const senderStock = await validateProductsOnSenderBranchAndGetStocks(createTransferProuctsData['sender_branch_id'], createTransferProuctsData['products']);
        const recieveStock = await validateProductsOnReceiverBranch(createTransferProuctsData['receiver_branch_id'], createTransferProuctsData['products']);
        if (xValidUser && xValidBranch) {
            console.log("here is createTransferProductsService", createTransferProuctsData);
            console.log("here is maped ", { id: uuidv4(), ...createTransferProuctsData });

            const savedData = await createTransferProductsRepo({ id: uuidv4(), ...createTransferProuctsData });


            // transfer product map
            const tpMap = new Map();
            createTransferProuctsData['products'].forEach(tp => {
                tpMap.set(tp.id, tp.quantity);
            });
            console.log("tpMap ", tpMap);

            // for sender branch
            let stockForSender = {};
            let stockForReceiver = {};
            senderStock.forEach(s => {
                stockForSender[s.id] = s.stock - tpMap.get(s.product_id);

            });
            recieveStock.forEach(s => {
                stockForReceiver[s.id] = tpMap.get(s.product_id) + s.stock;

            });

            console.log("stockForSender", stockForSender);
            console.log("stockForReceiver", stockForReceiver);

            const updatedStockForSender = await updateStocksBulkWitStockId(Object.entries(stockForSender).map(
                ([id, stock]) => ({
                    id,
                    stockData: {
                        stock
                    }
                })
            ));
            const updatedStockForReceiver = await updateStocksBulkWitStockId(Object.entries(stockForReceiver).map(
                ([id, stock]) => ({
                    id,
                    stockData: {
                        stock
                    }
                })
            ));
            console.log("updatedStockForSender", updatedStockForSender);
            console.log("updatedStockForReceiver", updatedStockForReceiver);
            return savedData;
        }
    } catch (error) {
        throw new AppErrors(error.message, error.statusCode);
    }
}
//if all validation are valid , then create tranfer products 