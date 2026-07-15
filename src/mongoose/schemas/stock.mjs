import mongoose from "mongoose";

const StockSchema = mongoose.Schema({
    "id": {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    "product_id": {
        // type: mongoose.Schema.Types.String,
        type: String,
        ref: "product",
        required: true,
    },
    "branch_id": {
        // type: mongoose.Schema.Types.String,
        type: String,
        ref: "branch",
        required: true,
    },
    "stock": {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    "low_stock": {
        type: mongoose.Schema.Types.Number,
        required: true,
    },

});

export const Stock = mongoose.model('stock', StockSchema)