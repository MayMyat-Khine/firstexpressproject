import { STOCK_NAMESPACE } from "../config/constants.mjs";
import { Stock } from "../mongoose/schemas/stock.mjs";
import * as stockRepo from "../repositories/stock.repository.mjs";
import { v5 as uuidv5 } from "uuid";
import AppErrors from "../utils/appErrors.mjs";

export const createStock = async (branchIds, productId, productCode, session) => {
    // FORCE ERROR FOR TEST
    // if (stock < 0) {
    //     throw new Error("Stock cannot be negative");
    // }
    // return await Stock.create([{
    //     id: id,
    //     product_id: productId,
    //     branch_id: branchId,
    //     stock: stock,
    //     low_stock: lowStock,
    // }], { session });

    // const stockKey = `${productData.code}:${productData.branch_id}`;
    // const stockUUID = uuidv5(stockKey, STOCK_NAMESPACE);
    // console.log("Stock UUID ", stockUUID);


    const stocks = branchIds.map(branchId => ({
        id: uuidv5(`${productCode}:${branchId}`, STOCK_NAMESPACE),
        product_id: productId,
        branch_id: branchId,
        stock: 0,
        low_stock: 0
    }));
    console.log(`Create Stock with Default 0`, stocks);

    return await stockRepo.createStock(stocks, session);
};

export const updateStock = async (id, stockData) => {
    await findStockById(id);
    return await stockRepo.updateStock(id, stockData);
};

export const findStockById = async (id) => {
    const foundStock = await stockRepo.findStockByIdRepo(id);
    if (!foundStock) {
        throw new AppErrors(`Stock ${id} is  not found`, 404)
    }
    return foundStock;
}
export const updateStocksBulk = async (stockUpdates, session) => {
    try {
        const bulkOps = stockUpdates.map(({ product_id, stockData }) => ({
            updateOne: {
                filter: { product_id: product_id },
                update: { $set: stockData }
            }
        }));
        // throw new Error("FORCED_TRANSACTION_FAILURE");
        const result = await Stock.bulkWrite(bulkOps, { session });
        return result;
    } catch (error) {
        throw error;
    }
}


export const updateStocksBulkWitStockId = async (stockUpdates, session) => {
    try {
        const bulkOps = stockUpdates.map(({ id, stockData }) => ({
            updateOne: {
                filter: { id: id },
                update: { $set: stockData }
            }
        }));
        // throw new Error("FORCED_TRANSACTION_FAILURE");
        const result = await Stock.bulkWrite(bulkOps, { session });
        return result;
    } catch (error) {
        throw error;
    }
}

// export const updatePatchStock = async (id, stockData) => {
//     return await Stock.updateOne(
//         { product_id: id },            // Filter
//         { $set: stockData } // Update operator
//     );

// };

export const deleteStock = async (id, session) => {
    return await Stock.deleteMany({ product_id: id }, { session });
};

export const findStocksByProductIds = async (ids) => {
    try {
        return await Stock.find({ product_id: { $in: ids } });
    } catch (error) {
        throw error;
    }
};

export const getAvailableStockByProductId = async (id) => {
    const stocks = await stockRepo.getAvailableStockByProductIdRepo(id);
    return stocks.map(item => ({
        branch_name: item.branch_id.name,
        stock: item.stock
    }));
}

export const getStockByProductIdAndBranchId = async (bid, pid) => {
    const foundStock = await stockRepo.getStocksOnBranchRepo(bid, pid);
    if (!foundStock) {
        throw new AppErrors(`One or more products is not found`, 404)
    }
    return foundStock;
}