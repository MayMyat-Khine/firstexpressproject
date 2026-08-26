import mongoose from "mongoose";
import { schemaTransform } from "../../utils/schemaTransform.mjs";

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
    "image": {
        type: String,
    },
    "region": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "country",
        required: true,
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

CustomerSchema.set("toJSON", schemaTransform);

export const Customer = mongoose.model('customer', CustomerSchema);

