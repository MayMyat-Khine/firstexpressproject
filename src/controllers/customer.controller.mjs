
import { matchedData } from "express-validator";
import { Customer } from "../mongoose/schemas/customer.mjs";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../services/user.service.mjs";
import { errorHandler } from "../middlewares/error.middleware.mjs";
import { createCustomer, deleteCustomer, getCustomers, updateCustomer } from "../services/customer.service.mjs";
import { uploadToCloudinary } from "../middlewares/cloudinary.middleware.mjs";

export async function customerCreateController(req, res, next) {
    const data = matchedData(req);

    try {
        console.log("CUstomer create controller", data)
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


export async function updateCustomerController(req, res, next) {
    try {

        if (req.file != undefined) {
            const result = await uploadToCloudinary(
                req.file.buffer,
                "retail/profile"
            );

            const imageUrl = result.secure_url;

            console.log("Image at Customer Update controller", imageUrl)
            await updateCustomer(req.customer, { ...req.body, image: imageUrl });
        }
        await updateCustomer(req.customer, req.body);

        return res.status(201).send({ success: true, message: "Sucessfully updated customer" });
    } catch (error) {
        next(error);
    }
}