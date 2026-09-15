import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env.EMAIL,//process.env.EMAIL,
        pass: env.EMAIL_PASSWORD,
    },
})

export async function sentMailUtil(email, otp) {
    await transporter.sendMail({
        from: env.EMAIL,
        to: email,
        subject: "Verify your email",
        html: `
      <h2>Your Verification Code</h2>

      <h1>${otp}</h1>

      <p>This code expires in 5 minutes.</p>
    `,
    });
}