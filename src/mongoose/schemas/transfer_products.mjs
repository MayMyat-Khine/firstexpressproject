import mongoose from "mongoose";

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

});


export const TransferProduct = mongoose.model('transfer product', TransferProductSchema);