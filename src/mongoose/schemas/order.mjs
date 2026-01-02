import mongoose from "mongoose";

const OrderScheme = mongoose.Schema({
    "order_id": ({
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    }),
    "merchant_id": ({
        type: mongoose.Schema.Types.String,
        required: true,

    }),
    "customer_id": ({
        type: mongoose.Schema.Types.String,
        required: true,

    }),
    "purchase_products": {
        type: [{
            id: {
                type: mongoose.Schema.Types.String,
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            },
        }],
        required: true,

    },
})

export const Order = mongoose.model('order', OrderScheme);