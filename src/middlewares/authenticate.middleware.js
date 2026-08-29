import jwt from "jsonwebtoken";
import AppErrors from "../utils/appErrors.js";
import { Customer } from "../mongoose/schemas/customer.js";
import { getCustomerById } from "../services/customer.service.js";
import { env } from "../config/env.js";


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
            env.ACCESS_TOKEN_SECRET
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

import { getUser } from "../services/user.service.js";


export async function authenticateUserMiddleware(req, res, next) {

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
            env.ACCESS_TOKEN_SECRET
        );




        // Find customer from DB
        const user = await getUser(decoded.id);
        // const customer = await Customer.findOne({
        //     id: decoded.customerId
        // });



        if (!user) {
            throw new AppErrors(
                "User no longer exists",
                401
            );
        }


        // Attach user information
        req.user = user;

        console.log("user", user)
        next();


    } catch (error) {

        next(error);

    }
}