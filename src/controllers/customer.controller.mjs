
import { matchedData } from "express-validator";
import { Customer } from "../mongoose/schemas/customer.mjs";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../services/user.service.mjs";
import { errorHandler } from "../middlewares/error.middleware.mjs";
import { createCustomer, deleteCustomer, getCustomers } from "../services/customer.service.mjs";

export async function customerCreateController(req, res, next) {

    const data = matchedData(req);

    try {

        const { token, refreshToken, customer } = await createCustomer(data);
        return res.status(201).send({ success: true, body: customer, token: token, refresh_token: refreshToken });
    } catch (error) {
        next(error);
    }
};

export async function getCustomersController(req, res, next) {
    try {
        const customers = await getCustomers();
        return res.status(201).send({ success: true, body: customers });
    } catch (error) {
        next(error);
    }
}

export async function deleteCustomerController(req, res, next) {
    try {
        console.log('here customer delete')
        await deleteCustomer(req.params.id);
        return res.status(201).send({ success: true, message: "Sucessfully deleted customer" });
    } catch (error) {
        next(error);
    }
}