import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
    email: String,

    otp: String,

    purpose: {
        type: String,
        enum: ["REGISTER", "FORGOT_PASSWORD"],
    },

    expiredAt: Date,

    verified: {
        type: Boolean,
        default: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Otp = mongoose.model('OtpSchema', otpSchema);
