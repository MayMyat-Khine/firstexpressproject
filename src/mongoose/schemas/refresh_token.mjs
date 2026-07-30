import mongoose from "mongoose";

const RefreshTokenSchema = mongoose.Schema({

    account_id: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    account_type: {
        type: String,
        enum: ["USER", "CUSTOMER"],
        required: true
    },

    token_hash: {
        type: String,
        required: true
    },

    expiresAt: {
        type: Date,
        required: true
    }

});

RefreshTokenSchema.index({ account_id: 1, account_type: 1 }, { unique: true });

export const RefreshToken = mongoose.model('refresh token', RefreshTokenSchema)