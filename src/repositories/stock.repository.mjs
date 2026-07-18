import { Stock } from '../mongoose/schemas/stock.mjs';

export const getStocksOnBranchRepo = async (branchId, productId) => {
    return await Stock.findOne({ "branch_id": branchId, "product_id": productId }).select('product_id stock id -_id');

}

export const findStockByIdRepo = async (id) => {
    return await Stock.findOne({ id: id });

}

export const createStock = async (stocks, session) => {
    // await Stock.create([{
    //     id: id,
    //     product_id: productId,
    //     branch_id: branchId,
    //     stock: stock,
    //     low_stock: lowStock,
    // }], { session });
    await Stock.insertMany(stocks, { session });
}

export const updateStock = async (id, stockData) => {
    return await Stock.findOneAndUpdate(
        { id: id },
        stockData,
        { new: true, runValidators: true }
        // runValidators: true //check the schme validation
        //  { new: true } // give the updated obj if its false then will give the old data even the data is updated
    );
}

export const getAvailableStockByProductIdRepo = async (productId) => {
    return await Stock.find({
        product_id: productId,
        stock: {
            $gt: 0
        }
    }).select("branch_id stock")
        .populate("branch_id", "name")
}