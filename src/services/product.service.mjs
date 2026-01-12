import { createStock, deleteStock, updateStock } from './stock.service.mjs';
import mongoose from 'mongoose';
import { Product } from '../mongoose/schemas/product.mjs';
import { PRODUCT_NAMESPACE, STOCK_NAMESPACE } from "../config/constants.mjs";
import { v5 as uuidv5 } from "uuid";




export const createProductWithStock = async (productData) => {
    const session = await mongoose.startSession();


    try {
        session.startTransaction();
        console.log("Product data", productData);
        const productKey = `${productData.product_name}`;
        const productUUID = uuidv5(productKey, PRODUCT_NAMESPACE);
        console.log(`Product UUID ${productData.product_name} `, productUUID);


        const foundProduct = await findProductById(productUUID);
        console.log(`Found Product  `, foundProduct);
        const stockKey = `${productUUID}:${productData.branch_id}`;
        const stockUUID = uuidv5(stockKey, STOCK_NAMESPACE);
        console.log("Stock UUID ", stockUUID);

        let savedProduct = null;
        if (foundProduct.length !== 0) {
            console.log("id ", foundProduct[0].id);
            console.log("branch data at index 0", productData.branch_id[0]);

            await productUpdateWithBranch(foundProduct[0].id, productData.branch_id[0]);
            savedProduct = await findProductById(foundProduct[0].id);
        } else {
            const newProduct = new Product({ id: productUUID, ...productData });
            savedProduct = await newProduct.save({ session });
        }
        console.log("Saved products ", savedProduct);
        await createStock(
            stockUUID,
            productUUID,
            productData.branch_id,
            productData.stock,
            productData.low_stock,
            session
        );
        await session.commitTransaction();
        return savedProduct;

    } catch (error) {
        await session.abortTransaction();
        console.error("Error creating product with stock:", error);
        throw error;
    } finally {
        session.endSession();
    }
};

export const productUpdateWithBranch = async (productId, branchData) => {

    try {
        console.log("Branch Data ", branchData);
        const updatedProduct = await Product.updateOne(
            { id: productId },  // match product
            { $addToSet: { branch_id: branchData } }             // add new branch
        );
        console.log("here is product update data", updatedProduct);
        return updatedProduct;
    } catch (error) {
        throw error;
    } finally { }
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
    try {
        const foundProduct = await Product.find({ id: id });
        return foundProduct;
    } catch (error) {
        throw error;
    }
}