import { Product } from '../mongoose/schemas/product.mjs';
import mongoose from "mongoose";

export const getProductsOnBranchRepo = async (branchId) => {

    return await Product.find({ "branch_id": new mongoose.Types.ObjectId(branchId) }).populate("branch_id").populate("stocks"); // stocks don't come out from TransferStock calling
}

export const getProductsRepo = async () => {
    return await Product.find().populate("stocks");
}

export async function createProduct(id, branches, productData, session) {
    const newProduct = new Product({ ...productData, id: id, branch_id: branches });
    const savedProduct = await newProduct.save({ session });
    return savedProduct;

}

export async function findProductByIdRepo(id) {
    const foundProduct = await Product.findOne({ id: id }).populate("stocks");
    return foundProduct;
}

export async function productUpdateWithBranch(productId, branchData) {

    const updatedProduct = await Product.updateOne(
        { id: productId },  // match product
        { $addToSet: { branch_id: branchData } }             // add new branch
    );
    return updatedProduct;

}

export async function updateProduct(productId, productData, session) {
    const update = {}

    if (productData.branch_id?.length > 0) {
        update.$addToSet = {
            branch_id: {
                $each: productData.branch_id
            }
        }
    }

    const { branch_id, ...otherFields } = productData;

    if (Object.keys(otherFields).length > 0) {
        update.$set = otherFields;
    }
    return Product.findOneAndUpdate(
        { id: productId },
        update,
        { new: true, runValidators: true, session });
}

export async function deleteProduct(productId, session) {
    return await Product.findOneAndDelete({ id: productId }, { session });
}