import { Stock } from '../mongoose/schemas/stock.mjs';

export const getStocksOnBranchRepo = async (branchId, productId) => {
    return await Stock.find({ "branch_id": branchId, "product_id": productId }).select('product_id stock id -_id');;

}

export const updateStock = async (stocks, session) => {
    // await Stock.create([{
    //     id: id,
    //     product_id: productId,
    //     branch_id: branchId,
    //     stock: stock,
    //     low_stock: lowStock,
    // }], { session });
    await Stock.insertMany(stocks, { session });
}