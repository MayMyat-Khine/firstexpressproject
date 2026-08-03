import jwt from "jsonwebtoken";
import { env } from "../config/env.mjs";

export function generateToken(payload) {

    return jwt.sign(
        payload,
        env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: env.ACCESS_TOKEN_EXPIRES
        }
    );

}

export function generateRefreshToken(payload) {

    return jwt.sign(
        payload,
        env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: env.REFRESH_TOKEN_EXPIRES
        }
    );

}

export function varifyRefreshToken(token) {
    return jwt.verify(
        token,
        env.REFRESH_TOKEN_SECRET
    );

}