import mongoose from "mongoose";
import { OrderStatus } from "../../enums/order_status.enum.mjs";
import { PaymentMethod } from "../../enums/payment_method.enum.mjs";

const OrderScheme = mongoose.Schema({
    "id": ({
        type: mongoose.Schema.Types.String,
        required: true,
        // unique: true
    }),
    "branch_id": ({
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
                ref: "product",
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                required: true,
            },
            price: {
                type: Number,
                required: true
            },

            subtotal: {
                type: Number,
                required: true,
            }
        }],
        required: true,

    },

    subtotal: {
        type: Number,
        required: true
    },

    discount: {
        type: Number,
        default: 0
    },

    total_amount: {
        type: Number,
        required: true
    },

    "payment_method": {
        type: String,
        enum: Object.values(PaymentMethod),
        required: true
    },
    "status": {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.PENDING,
        required: true
    },
    "notes": {
        type: String,
    }
}, {
    timestamps: true
});

export const Order = mongoose.model('order', OrderScheme);