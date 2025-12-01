import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
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

    },
})

export const User = mongoose.model('user', UserSchema);

