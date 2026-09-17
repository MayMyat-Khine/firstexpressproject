
import { success } from "zod";
import { loginCustomer, loginUser, refreshToken } from "../services/auth.service.js";
import { otpSend, otpVerify } from "../services/otp.service.js";
import { generateOTP } from "../utils/otpGenerator.util.js";
import { updatePassword } from "../services/customer.service.js";

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

        const otp = await otpSend(req.body.email, req.body.purpose);
        res.json({ success: true, message: `Used this OTP for now ${otp} \n Already send OTP to your mail, please check it.` })
    } catch (error) {
        next(error);
    }
}

export async function verifyOTP(req, res, next) {
    try {

        await otpVerify(req.body.email, req.body.otp, req.body.purpose)
        res.json({ success: true })
    } catch (error) {
        next(error);
    }
}
export async function resetPassword(req, res, next) {
    try {
        await updatePassword(req.body.email, req.body.password)
        res.json({ success: true, message: "Successfully update your password" })
    } catch (error) {
        next(error);
    }
}