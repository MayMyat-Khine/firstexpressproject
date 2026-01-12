import { Product } from '../mongoose/schemas/product.mjs';

export const getProductsOnBranchRepo = async (branchId) => {
    return await Product.find({ "branch_id": branchId });

}