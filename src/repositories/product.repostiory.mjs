import { Product } from '../mongoose/schemas/product.mjs';

export const getProductsOnBranchRepo = async (branchId) => {
    console.log("branchID ", branchId);
    return await Product.find({ "branch_id": branchId });

}

export async function createProduct(id, branches, productData, session) {
    const newProduct = new Product({ ...productData, id: id, branch_id: branches });
    const savedProduct = await newProduct.save({ session });
    return savedProduct;

}

export async function findProductByIdRepo(id) {
    const foundProduct = await Product.findOne({ id: id });
    return foundProduct;
}

export async function productUpdateWithBranch(productId, branchData) {
    console.log("Branch Data ", branchData);
    const updatedProduct = await Product.updateOne(
        { id: productId },  // match product
        { $addToSet: { branch_id: branchData } }             // add new branch
    );
    console.log("here is product update data", updatedProduct);
    return updatedProduct;

}