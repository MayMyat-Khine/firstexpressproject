import mongoose from "mongoose";
import { schemaTransform } from "../../utils/schemaTransform.js";

const BrandSchema = mongoose.Schema({
    "id": {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    "brand_name": {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true
    },
    "category_ids": [{
        type: String,
        ref: "category",
    }],
    "isDelete": {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
}
);

BrandSchema.set("toJSON", schemaTransform);

export const Brand = mongoose.model('brand', BrandSchema);