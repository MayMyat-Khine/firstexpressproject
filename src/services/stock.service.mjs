import { Stock } from "../mongoose/schemas/stock.mjs";
export const createStock = async (id, productId, stock = 0, lowStock = 0, session) => {
    // FORCE ERROR FOR TEST
    if (stock < 0) {
        throw new Error("Stock cannot be negative");
    }
    console.log("Here is stock data to create at service ", id);
    console.log("Here is stock data to create at service prodcut id ", productId);
    return await Stock.create([{
        id: id,
        product_id: productId,
        stock: stock,
        low_stock: lowStock,
    }], { session });
};

export const updateStock = async (id, stockData) => {
    //  const updatedStock = await Stock.replaceOne({ product_id: id }, body);
    return await Stock.findOneAndUpdate(
        { product_id: id },
        stockData,
        { new: true, runValidators: true }
        // runValidators: true //check the schme validation
        //  { new: true } // give the updated obj if its false then will give the old data even the data is updated
    );
};

export const updateStocksBulk = async (stockUpdates, session) => {
    console.log("Here is stock updates for bulk", stockUpdates);
    const bulkOps = stockUpdates.map(({ product_id, stockData }) => ({
        updateOne: {
            filter: { product_id: product_id },
            update: { $set: stockData }
        }
    }));
    // throw new Error("FORCED_TRANSACTION_FAILURE");
    return await Stock.bulkWrite(bulkOps, { session });
}

export const updatePatchStock = async (id, stockData) => {
    return await Stock.updateOne(
        { product_id: id },            // Filter
        { $set: stockData } // Update operator
    );

};

export const deleteStock = async (id) => {
    return await Stock.findOneAndDelete({ product_id: id });
};

export const findStocksByProductIds = async (ids) => {
    try {
        return await Stock.find({ product_id: { $in: ids } });
    } catch (error) {
        throw error;
    }
};

