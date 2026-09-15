
import { loginCustomer, loginUser, refreshToken } from "../services/auth.service.js";
import { otpSend } from "../services/otp.service.js";
import { generateOTP } from "../utils/otpGenerator.util.js";

export async function loginCustomerController(req, res, next) {
    try {
        console.log("auth controller")
        const { token, refreshToken, customer } = await loginCustomer(req);
        res.json({ success: true, body: customer, token: token, refresh_token: refreshToken });
    } catch (error) {
        next(error);
    }
};

export async function loginUserController(req, res, next) {
    try {
        const { token, refreshToken, user } = await loginUser(req);
        res.json({ success: true, body: user, token: token, refresh_token: refreshToken });
    } catch (error) {
        next(error);
    }
};

export async function refreshTokenController(req, res, next) {

    try {

        const { accessToken } = await refreshToken(req.body.refresh_token)
        res.json({ success: true, access_token: accessToken });
    } catch (error) {
        next(error);
    }
}

export async function sendOTP(req, res, next) {
    try {

        await otpSend(req.body.email, req.body.purpose);
        res.json({ success: true, message: "Already send OTP to your mail, please check it." })
    } catch (error) {
        next(error);
    }
}