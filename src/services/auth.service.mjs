import { findCustomerByPhone } from "../repositories/customer.repostiory.mjs";
import { generateRefreshToken, generateToken, varifyRefreshToken } from "../utils/jwt.util.mjs";
import { getCustomerById } from "./customer.service.mjs";
import AppErrors from "../utils/appErrors.mjs";
import bcrypt from "bcrypt";
import { findUserById, findUserByName } from "./user.service.mjs";
import { getRefreshToken, saveRefreshTokenRepo } from "../repositories/auth.repository.mjs";
import jwt from "jsonwebtoken";
import crypto from 'crypto';

export const loginCustomer = async (data) => {
    const {
        phone_number,
        password
    } = data.body;

    const customer = await findCustomerByPhone(phone_number);
    if (!customer) {
        throw new AppErrors(
            "Invalid phone number or password",
            401
        );
    }

    const isPasswordValid = await bcrypt.compare(
        password,              // plain password from request
        customer.password      // hashed password from DB
    );

    if (!isPasswordValid) {
        throw new AppErrors(
            "Invalid phone number or password",
            401
        );
    }

    const token = generateToken({ id: customer.id })
    const refreshToken = generateRefreshToken({ id: customer.id, type: "CUSTOMER" })

    await saveRefreshToken({ accountId: customer.id, accountType: "CUSTOMER", refreshToken: refreshToken });
    const customerResponse = {
        id: customer.id,
        name: customer.name,
        phone_number: customer.phone_number
    };

    return {
        token,
        refreshToken: refreshToken,
        customer: customerResponse
    };


}


export const loginUser = async (data) => {
    const {
        name,
        password
    } = data.body;

    const user = await findUserByName(name);
    if (!user) {
        throw new AppErrors(
            "Invalid Name or password",
            401
        );
    }

    const isPasswordValid = await bcrypt.compare(
        password,              // plain password from request
        user.password      // hashed password from DB
    );

    if (!isPasswordValid) {
        throw new AppErrors(
            "Invalid name or password",
            401
        );
    }

    const token = generateToken({ id: user.id })

    const refreshToken = generateRefreshToken({ id: user.id, type: "USER" })



    await saveRefreshToken({ accountId: user.id, accountType: "USER", refreshToken: refreshToken });
    const userResponse = {
        id: user.id,
        name: user.name,
        phone_number: user.phone_number
    };

    return {
        token,
        refreshToken: refreshToken,
        user: userResponse
    };


}


export const refreshToken = async (token) => {

    // 1. Verify JWT
    const payload = varifyRefreshToken(token);


    // 2. Hashing and Check token exists in DB
    const hashToken = hashingToken(token)
    const storedToken = await getRefreshToken(hashToken);
    if (!storedToken) {
        throw new AppErrors(`Refresh token not found`, 404)
    }

    // 3. Check expiry
    if (storedToken.expiresAt < new Date()) {
        throw new Error("Refresh token expired");
    }

    // 4. Find account
    let account;

    if (payload.type === "USER") {
        account = await findUserById(payload.id);
    } else {
        account = await getCustomerById(payload.id)
    }

    if (!account) {
        throw new Error("Account not found");
    }

    // 5. Generate new access token
    const accessToken = generateToken({
        id: account.id,
    });



    return {
        accessToken
    };
}

export const saveRefreshToken = async ({
    accountId,
    accountType,
    refreshToken
}) => {

    const decoded = jwt.decode(refreshToken);

    const expiresAt = new Date(decoded.exp * 1000);
    const hashToken = hashingToken(refreshToken);
    await saveRefreshTokenRepo(
        { id: accountId, type: accountType, token: hashToken, expiresAt: expiresAt }
    );

};

const hashingToken = (token) => {
    return crypto.createHash("sha256").update(token).digest("hex");
}