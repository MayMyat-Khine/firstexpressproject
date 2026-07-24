
import { loginCustomer, loginUser } from "../services/auth.service.mjs";

export async function loginCustomerController(req, res, next) {
    try {
        const { token, customer } = await loginCustomer(req);
        res.json({ success: true, body: customer, token: token });
    } catch (error) {
        next(error);
    }
};

export async function loginUserController(req, res, next) {
    try {
        const { token, user } = await loginUser(req);
        res.json({ success: true, body: user, token: token });
    } catch (error) {
        next(error);
    }
};