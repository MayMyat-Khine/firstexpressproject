import jwt from "jsonwebtoken";

export function generateToken(payload) {

    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES
        }
    );

}

export function generateRefreshToken(payload) {

    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES
        }
    );

}

export function varifyRefreshToken(token) {
    return jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET
    );

}