import jwt from "jsonwebtoken";
import AppErrors from "../utils/appErrors.mjs";
import { Customer } from "../mongoose/schemas/customer.mjs";
import { getCustomerById } from "../services/customer.service.mjs";


export async function authenticateMiddleware(req, res, next) {

    try {

        // Get token from header
        const authHeader = req.headers.authorization;


        if (!authHeader) {
            throw new AppErrors(
                "Authentication token is required",
                401
            );
        }


        // Format:
        // Authorization: Bearer eyJhbGc...
        const token = authHeader.split(" ")[1];


        if (!token) {
            throw new AppErrors(
                "Invalid token format",
                401
            );
        }


        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );




        // Find customer from DB
        const customer = await getCustomerById(decoded.id);
        // const customer = await Customer.findOne({
        //     id: decoded.customerId
        // });


        if (!customer) {
            throw new AppErrors(
                "User no longer exists",
                401
            );
        }


        // Attach user information
        req.customer = customer;


        next();


    } catch (error) {

        next(error);

    }
}