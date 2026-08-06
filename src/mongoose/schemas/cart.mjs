import mongoose from "mongoose";
import { schemaTransform } from "../../utils/schemaTransform.mjs";

const CartSchema = new mongoose.Schema({
    customer_id: {
        type: String,
        ref: "customer",
        required: true,
        unique: true
    },
    items: [//every object inside an array as a subdocument , every subdoc has _id by default
        {
            _id: false,
            product_id: {
                type: String,
                ref: "product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]
}, {
    timestamps: true
});

CartSchema.set("toJSON", schemaTransform);

export const Cart = mongoose.model('cart', CartSchema);