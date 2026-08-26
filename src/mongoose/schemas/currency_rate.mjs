import mongoose from "mongoose";
import { schemaTransform } from "../../utils/schemaTransform.mjs";

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
