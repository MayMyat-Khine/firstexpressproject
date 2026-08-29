import mongoose from "mongoose";
import { UserRole } from "../../enums/user_roles.enum.js";
import { schemaTransform } from "../../utils/schemaTransform.js";

const UserSchema = mongoose.Schema({
    "id": {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    "name": {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
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
    "role":
    {
        type: String,
        ref: 'role'
    }
})

UserSchema.set("toJSON", schemaTransform);

export const User = mongoose.model('user', UserSchema);

