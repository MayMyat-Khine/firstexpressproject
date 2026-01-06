import { createStock, deleteStock, updateStock } from './stock.service.mjs';
import mongoose from 'mongoose';
import { Product } from '../mongoose/schemas/product.mjs';

export const createProductWithStock = async (productData) => {
    const session = await mongoose.startSession();


    try {
        session.startTransaction();
        console.log("Here is product data to create at service ", productData);
        const newProduct = new Product(productData);
        console.log("Here is new product before save", newProduct);
        const savedProduct = await newProduct.save({ session });
        console.log("Here is new product after save", savedProduct);
        await createStock(
            productData.stock_id,
            productData.id,
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