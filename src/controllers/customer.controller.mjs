
import { matchedData } from "express-validator";
import { Customer } from "../mongoose/schemas/customer.mjs";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../services/user.service.mjs";
import { errorHandler } from "../middlewares/error.middleware.mjs";
import { createCustomer } from "../services/customer.service.mjs";

export async function customerCreateController(req, res, next) {

    const data = matchedData(req);

    try {

        const { token, customer } = await createCustomer(data);
        return res.status(201).send({ success: true, body: customer, token: token });
    } catch (error) {
        next(error);
    }
};
