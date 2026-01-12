import { Stock } from '../mongoose/schemas/stock.mjs';

export const getStocksOnBranchRepo = async (branchId, productId) => {
    return await Stock.find({ "branch_id": branchId, "product_id": productId }).select('product_id stock id -_id');;

}