import mongoose from "mongoose";
import { schemaTransform } from "../../utils/schemaTransform.mjs";

const TransferProductSchema = mongoose.Schema({
    "id": {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    "sender_branch_id": {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    "receiver_branch_id": {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    "products": {
        type: mongoose.Schema.Types.Array,
        required: true,
    },
    "created_by": {
        type: mongoose.Schema.Types.String,
        required: true,
    },

}, {
    timestamps: true,
});

TransferProductSchema.set("toJSON", schemaTransform);


export const TransferProduct = mongoose.model('transfer product', TransferProductSchema);