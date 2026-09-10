import mongoose from "mongoose";
import { schemaTransform } from "../../utils/schemaTransform.js";

const CategorySchema = mongoose.Schema({
    "id": {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    "category_name": {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true
    },
    "brand_ids": [{
        type: String,
        ref: "brand",
    }],
    "isDelete": {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
}
);

CategorySchema.set("toJSON", schemaTransform);

export const Category = mongoose.model('category', CategorySchema);