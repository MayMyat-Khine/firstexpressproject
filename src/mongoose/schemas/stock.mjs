import mongoose from "mongoose";

const StockSchema = mongoose.Schema({
    "id": {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    "product_id": {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    "current_stock": {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    "max_stock": {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    "min_stock": {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
});

export const Stock = mongoose.model('stock', StockSchema)