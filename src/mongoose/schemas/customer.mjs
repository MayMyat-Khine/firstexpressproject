import mongoose from "mongoose";

const CustomerSchema = mongoose.Schema({
    "id": {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    "name": {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    "display_name": {
        type: mongoose.Schema.Types.String,
        required: true
    },
    "password": {
        type: mongoose.Schema.Types.String,
        required: true,
        minlenght: 6
    },
    "phone_number": {
        type: String,
        unique: true,
        required: true
    },


})

export const Customer = mongoose.model('customer', CustomerSchema);

