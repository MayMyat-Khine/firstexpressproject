import mongoose from "mongoose";

const BranchSchema = mongoose.Schema({
    "id": {
        type: mongoose.Schema.Types.String,
        require: true,
        unique: true
    },
    "name": {
        type: mongoose.Schema.Types.String,
        required: true
    },
    "address": {
        type: mongoose.Schema.Types.String,
        required: true
    },
    "contact": {
        type: mongoose.Schema.Types.String,
    }
});

export const Branch = mongoose.model('branch', BranchSchema);