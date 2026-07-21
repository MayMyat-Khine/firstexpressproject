import { findCustomerByPhone } from "../repositories/customer.repostiory.mjs";
import { generateToken } from "../utils/jwt.util.mjs";
import { getCustomerById } from "./customer.service.mjs";
import AppErrors from "../utils/appErrors.mjs";
import bcrypt from "bcrypt";

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
    const customerResponse = {
        id: customer.id,
        name: customer.name,
        phone_number: customer.phone_number
    };

    return {
        token,
        customer: customerResponse
    };


}
