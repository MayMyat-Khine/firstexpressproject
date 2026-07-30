import * as customerRepo from "../repositories/customer.repostiory.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { generateRefreshToken, generateToken } from "../utils/jwt.util.mjs";
import { saveRefreshToken } from "./auth.service.mjs";

export const createCustomer = async (registerData) => {
    try {
        const hashedPassword = await bcrypt.hash(registerData.password, 10);
        const savedCustomer = await customerRepo.createCustomerRepo({ ...registerData, id: uuidv4(), password: hashedPassword });
        const token = generateToken({ id: savedCustomer.id })
        const refreshToken = generateRefreshToken({ id: savedCustomer.id, type: "CUSTOMER" })
        await saveRefreshToken({ accountId: savedCustomer.id, accountType: "CUSTOMER", refreshToken: refreshToken });
        return {
            token: token,
            refreshToken, refreshToken,
            customer: savedCustomer
        }
    } catch (error) {
        throw error;
    }
};

export const getCustomerById = async (id) => {
    return await customerRepo.getCustomerByIdRepo(id);
}