import { createStock, deleteStock, getAvailableStockByProductId } from './stock.service.mjs';
import mongoose from 'mongoose';
import { Product } from '../mongoose/schemas/product.mjs';
import { validateBranches, getBranchesData } from './branch.service.mjs';
import { PRODUCT_NAMESPACE, STOCK_NAMESPACE } from "../config/constants.mjs";
import { v5 as uuidv5 } from "uuid";
import * as productRepo from "../repositories/product.repostiory.mjs";
import AppErrors from '../utils/appErrors.mjs';
import { application } from 'express';




export const createProductWithBranchAndStock = async (productData) => {
    const session = await mongoose.startSession();


    try {
        session.startTransaction();
        // =======Validatea branchIds and Get BranchObjIds for  both Product and Stock Create ==============
        const validatedBranchIds = await validateBranches(productData.branch_id);

        const productKey = `${productData.product_name}:${productData.code}`;
        const productUUID = uuidv5(productKey, PRODUCT_NAMESPACE);

        const savedProduct = await productRepo.createProduct(productUUID, validatedBranchIds, productData, session);

        await createStock(
            validatedBranchIds,
            productUUID,
            productData.code,
            session
        );
        // Replace BranchObjId with BranchId(Name)

        const branchesNames = await getBranchesData(validatedBranchIds);
        await session.commitTransaction();
        return { ...savedProduct._doc, branch_id: branchesNames };;

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

// export const productUpdateWithBranch = async (productId, branchData) => {
//     return productRepo.productUpdateWithBranch(productId, branchData);
// }


export const productUpdateWithStock = async (productId, productData) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // - update stock should be moved to StockUpdateController with product id at param

        const oldProduct = await findProductById(productId);
        if (productData.branch_id && productData.branch_id.length > 0)// has Branch new add? 
        {
            // valid all branches exist and non-added before update
            const validatedBranchIds = await validateBranches(productData.branch_id);
            const existingBranchIds = validatedBranchIds.filter(id =>
                oldProduct.branch_id.includes(id)
            );
            if (existingBranchIds.length > 0) {
                throw new AppErrors('One or more branches are already added', 400)
            }
            await createStock(
                validatedBranchIds,
                productId,
                oldProduct.code,
                session
            );
        }

        const updatedProduct = await productRepo.updateProduct(productId, productData, session);
        await session.commitTransaction();
        return updatedProduct;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
}

// export const productPatchWithStock = async (productId, productData) => {
//     try {
//         const updatedProduct = await Product.updateOne(
//             { id: productId },
//             { $set: productData }
//         );
//         await updateStock({
//             id: productId, stockData: {
//                 stock: productData.stock,
//                 low_stock: productData.low_stock
//             }
//         });

//         return updatedProduct;
//     } catch (error) {
//         throw error;
//     } finally { }
// };

export const deleteProdcutWithStock = async (productId) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        // - Check this product stock is 0 at all it's branches 
        // - if stock > 0 ? alert to transfer the Product or Sell  : delete at product and stock dbs
        const branches = await getAvailableStockByProductId(productId);
        if (branches?.length > 0) {
            const errorMessage = branches
                .map(item => `${item.branch_name} : (${item.stock})`)
                .join(", ");
            throw new AppErrors(`Can't delete this products as some branches have stocks : ${errorMessage}`, 400)
        }
        const deletedProduct = await productRepo.deleteProduct(productId, session)
        const deletedStock = await deleteStock(productId, session);
        await session.commitTransaction();
        return deletedProduct;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
};

export const findProductsByIds = async (ids) => {
    try {


        const foundProduct = await Product.find({ id: { $in: ids } });

        return foundProduct;
    } catch (error) {
        throw error;
    }
};

export const findProductById = async (id) => {
    const foundProduct = await productRepo.findProductByIdRepo(id);
    if (!foundProduct) {
        throw new AppErrors(`Product id ${id} is not found`, 404)
    }
    return foundProduct;
}

export const getProducts = async () => {
    return productRepo.getProductsRepo();
}

export const getProductsByBranch = async (branchId) => {
    return await productRepo.getProductsOnBranchRepo(branchId);
}

export const getProductsByProductIdAndBranch = async (branchId, productIds) => {
    return productRepo.getProductsOnBranchByProductIdRepo(branchId, productIds);
}

