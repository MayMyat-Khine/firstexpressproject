import { createStock, deleteStock, updateStock } from './stock.service.mjs';
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
            productData,
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

export const productUpdateWithBranch = async (productId, branchData) => {
    return productRepo.productUpdateWithBranch(productId, branchData);
}


export const productUpdateWithStock = async (productId, productData) => {

    try {
        console.log("here is product update data", productData);
        const updatedProduct = await Product.findOneAndUpdate({ id: productId }, productData, { new: true, runValidators: true });
        await updateStock({
            id: productId, stockData: {
                stock: productData.stock,
                low_stock: productData.low_stock
            }
        });
        return updatedProduct;
    } catch (error) {
        throw error;
    } finally { }
}

export const productPatchWithStock = async (productId, productData) => {
    try {
        const updatedProduct = await Product.updateOne(
            { id: productId },
            { $set: productData }
        );
        await updateStock({
            id: productId, stockData: {
                stock: productData.stock,
                low_stock: productData.low_stock
            }
        });

        return updatedProduct;
    } catch (error) {
        throw error;
    } finally { }
};

export const deleteProdcutWithStock = async (productId) => {
    console.log("Here is product id for delete in service", productId);
    try {
        const deletedProduct = await Product.findOneAndDelete({ id: productId });
        const deletedStock = await deleteStock({ id: productId });
        return deletedProduct;
    } catch (error) {
        throw error;
    } finally {

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