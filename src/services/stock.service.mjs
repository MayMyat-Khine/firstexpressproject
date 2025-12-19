import { Stock } from "../mongoose/schemas/stock.mjs";
export const createStock = async ({ id, productId, stock = 0, lowStock = 0 }) => {

    return await Stock.create({
        id: id,
        product_id: productId,
        stock: stock,
        low_stock: lowStock,
    },);
};

export const updateStock = async ({ id, stockData }) => {
    //  const updatedStock = await Stock.replaceOne({ product_id: id }, body);
    return await Stock.findOneAndUpdate(
        { product_id: id },
        stockData,
        { new: true, runValidators: true }
        // runValidators: true //check the schme validation
        //  { new: true } // give the updated obj if its false then will give the old data even the data is updated
    );
};

export const updatePatchStock = async ({ id, stockData }) => {
    return await Stock.updateOne(
        { product_id: id },            // Filter
        { $set: stockData } // Update operator
    );

};

export const deleteStock = async ({ id }) => {
    return await Stock.findOneAndDelete({ product_id: id });
};