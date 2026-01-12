import { TransferProduct } from "../mongoose/schemas/transfer_products.mjs";

export const createTransferProductsRepo = async (data) => {
    try {
        console.log("data", data);
        const newTransferProduct = new TransferProduct(data);
        const savedTransferProduct = await newTransferProduct.save();
        console.log("saved data", savedTransferProduct);
        return savedTransferProduct;
    } catch (error) {
        throw error;
    }
};