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
    "branch_id": [{ type: mongoose.Schema.Types.ObjectId, ref: "branch" }],
    "description": {
        type: mongoose.Schema.Types.String,
    },
    "code": {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    "price": {
        type: mongoose.Schema.Types.Number,
        required: true,
        min: [0, "Price cannot be negative"]
    }


})

ProductSchema.virtual("stocks", {
    ref: "stock",
    localField: "id",
    foreignField: "product_id"
});

ProductSchema.set("toJSON", {
    virtuals: true
});

export const Product = mongoose.model('product', ProductSchema);