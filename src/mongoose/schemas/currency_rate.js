import mongoose from "mongoose";
import { schemaTransform } from "../../utils/schemaTransform.js";

const CurrencyRateSchema = mongoose.Schema({

    code: {
        type: String,
        required: true,
        unique: true
    },
    rate: {
        type: Number,
        required: true
    }
});

CurrencyRateSchema.set("toJSON", schemaTransform);

export const CurrencyRate = mongoose.model("currencyrate", CurrencyRateSchema);
