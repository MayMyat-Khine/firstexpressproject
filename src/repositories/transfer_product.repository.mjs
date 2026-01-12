import { TransferProduct } from "../mongoose/schemas/transfer_products.mjs";

export const createTransferProductsRepo = async (data) => {
    try {

        const newTransferProduct = new TransferProduct(data);
        const savedTransferProduct = newTransferProduct.save();
        return savedTransferProduct;
    } catch (error) {
        throw error;
    }
};