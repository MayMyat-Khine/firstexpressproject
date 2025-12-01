import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    "id": {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    "product_name": {
        type: mongoose.Schema.Types.String,
        required: true,
    },

    "description": {
        type: mongoose.Schema.Types.String,
    },


})

export const Product = mongoose.model('product', ProductSchema);