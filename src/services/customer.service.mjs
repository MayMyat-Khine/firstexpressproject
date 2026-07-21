import * as customerRepo from "../repositories/customer.repostiory.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const createCustomer = async (registerData) => {
    try {
        const hashedPassword = await bcrypt.hash(registerData.password, 10);
        const savedCustomer = await customerRepo.createCustomerRepo({ ...registerData, id: uuidv4(), password: hashedPassword });
        const token = jwt.sign(
            {
                customerId: savedCustomer.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        return {
            token: token,
            customer: savedCustomer
        }
    } catch (error) {
        throw error;
    }
};

export const getCustomerById = async (id) => {
    return await customerRepo.getCustomerByIdRepo(id);
}