import * as customerRepo from "../repositories/customer.repostiory.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { generateRefreshToken, generateToken } from "../utils/jwt.util.mjs";
import { saveRefreshToken } from "./auth.service.mjs";
import { hashPassword } from "../utils/password.util.mjs";
import AppErrors from "../utils/appErrors.mjs";
import { getDialCodeByCountryId } from "./countries.service.mjs";

export const createCustomer = async (registerData) => {
    try {
        const hashedPassword = await bcrypt.hash(registerData.password, 10);
        const dialCode = await getDialCodeByCountryId(registerData.region);
        const phoneWithRegionId = dialCode.dialCode + registerData.phone_number
        const savedCustomer = await customerRepo.createCustomerRepo({ ...registerData, id: uuidv4(), password: hashedPassword, phone_number: phoneWithRegionId });
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

export const getCustomers = async () => {
    return await customerRepo.getCustomersRepo();
}

export const deleteCustomer = async (id) => {
    return await customerRepo.deleteCustomerRepo(id);
}



export const updateCustomer = async (customer, customerData) => {
    // if customerData has Phone changed then Check the Ph Num is valid

    console.log("Customer Update Data", customerData);
    if (customerData.phone_number != undefined) {
        const hasCustomer = await customerRepo.findCustomerByPhone(customer.phone_number);
        console.log("has Customer", hasCustomer);
        if (hasCustomer != undefined) {

            throw new AppErrors("This phone number is already used", 400)
        }
    }


    if (customerData.password != undefined) {
        console.log("Password", customerData.password)
        const hashPassword = await bcrypt.hash(customerData.password, 10);
        return await customerRepo.updateCustomerRepo(customer.id, { ...customerData, password: hashPassword });
    }
    return await customerRepo.updateCustomerRepo(customer.id, customerData);
}