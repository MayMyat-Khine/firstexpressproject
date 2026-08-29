import mongoose from "mongoose";
import { schemaTransform } from "../../utils/schemaTransform.js";

const CountrySchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    dialCode: {
        type: String,
        required: true
    },
    currencyCode: {
        type: String,
        required: true
    }
});

CountrySchema.set("toJSON", schemaTransform);

export const Country = mongoose.model("country", CountrySchema);
