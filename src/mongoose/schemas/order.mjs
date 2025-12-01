import mongoose from "mongoose";

const OrderScheme = mongoose.Schema({
    "order_id": ({
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    }),
    "marchant_name": ({
        type: mongoose.Schema.Types.String,
        required: true,

    }),
    "customer_name": ({
        type: mongoose.Schema.Types.String,
        required: true,

    }),
    "purchase_products": ({
        type: mongoose.Schema.Types.Array,
        required: true,

    }),
    "total_amount": ({
        type: mongoose.Schema.Types.Number,
        required: true,

    }),
    "purchase_time": ({
        type: mongoose.Schema.Types.Date,
        required: true,
    }),


})

export const Order = mongoose.model('order', OrderScheme);