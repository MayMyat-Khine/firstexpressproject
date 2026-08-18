import { Router } from "express";
import { checkSchema } from "express-validator";
import { createCustomerValidationScheme } from "../utils/validationSchema.mjs";
import { validate, validateAllowedFields, validatePatchBody } from "../middlewares/validate.middleware.mjs";

import { customerCreateController, deleteCustomerController, getCustomersController } from "../controllers/customer.controller.mjs";

const router = Router();


router.post("/customer",
    validatePatchBody,
    checkSchema(createCustomerValidationScheme),
    validateAllowedFields(Object.keys(createCustomerValidationScheme)),
    validate,
    customerCreateController
);

router.get("/customer", getCustomersController);

router.delete('/customer/:id', deleteCustomerController)

export default router;