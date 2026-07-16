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
        min: [0, "Stock cannot be negative"]
    },
    "low_stock": {
        type: mongoose.Schema.Types.Number,
        required: true,
        min: [0, "Low stock cannot be negative"]
    },

});

export const Stock = mongoose.model('stock', StockSchema)