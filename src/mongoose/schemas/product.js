import mongoose from "mongoose";
import { schemaTransform } from "../../utils/schemaTransform.js";

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
    "branch_id": [{ type: mongoose.Schema.Types.String, required: true }],
    "description": {
        type: mongoose.Schema.Types.String,
    },
    "code": {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    "unit": {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    "price": [
        {
            amount: {
                type: Number,
                required: true,
                min: [0, "Price cannot be negative"],
            },
            currency: {
                type: String,
                enum: ["MMK", "THB", "USD", "SGD"],
                required: true,
            },
        },
    ],
    "images": {
        type: [String],
        default: []
    }


})

ProductSchema.virtual("stocks", {
    ref: "stock",
    localField: "id",
    foreignField: "product_id"
});


ProductSchema.set("toJSON", schemaTransform);

export const Product = mongoose.model('product', ProductSchema);