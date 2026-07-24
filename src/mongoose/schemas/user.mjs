import mongoose from "mongoose";
import { UserRole } from "../../enums/user_roles.enum.mjs";

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

export const User = mongoose.model('user', UserSchema);

