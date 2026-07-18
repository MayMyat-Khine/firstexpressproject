import { TransferProduct } from "../mongoose/schemas/transfer_products.mjs";

export const createTransferProductsRepo = async (data, session) => {
    const newTransferProduct = new TransferProduct(data);
    const savedTransferProduct = await newTransferProduct.save({ session });
    return savedTransferProduct;

};

export const getAllRecordsRepo = async () => {
    return await TransferProduct.find();
}