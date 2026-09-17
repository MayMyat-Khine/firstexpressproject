import { Otp } from "../mongoose/schemas/otp.js";
import { generateOTP } from "../utils/otpGenerator.util.js";
import { sendMailUtil } from "../utils/mail.util.js";
import AppErrors from "../utils/appErrors.js";
import { findCustomerByEmail } from "../repositories/customer.repostiory.js";


export async function otpSend(email, purpose) {

    try {



        const foundCustomer = await findCustomerByEmail(email)


        if (purpose === "FORGET_PASSWORD") {

            if (!foundCustomer) throw new AppErrors("Email Not Found")
        }

        if (purpose === "REGISTER") {
            if (foundCustomer) throw new AppErrors("Email Already Exised")
        }

        const otp = generateOTP();
        await Otp.create({
            email,
            otp,
            purpose,
            expiredAt: new Date(Date.now() + 2 * 60 * 1000),
        });

        await sendMailUtil(email, otp);
        return otp;
    } catch (error) {
        console.log(error)
        throw new AppErrors(error);
    }

}

export async function otpVerify(email, otp, purpose) {
    try {
        const otpRecord = await Otp.findOne({
            email,
            otp,
            purpose,
            verified: false,
        });

        if (!otpRecord) {
            throw new Error("Invalid OTP");
        }

        if (otpRecord.expiredAt < new Date()) {
            throw new AppErrors("OTP has expired");
        }
        otpRecord.verified = true;
        await Otp.deleteOne({
            _id: otpRecord._id,
        });
        // await otpRecord.save();
        // return otpRecord;
    } catch (error) {
        throw new AppErrors(error)
    }
}
