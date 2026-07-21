import { Router } from "express";
import { checkSchema } from "express-validator";
import { createCustomerValidationScheme } from "../utils/validationSchema.mjs";
import { validate, validateAllowedFields, validatePatchBody } from "../middlewares/validate.middleware.mjs";

import { customerCreateController } from "../controllers/customer.controller.mjs";

const router = Router();


router.post("/api/customer",
    validatePatchBody,
    checkSchema(createCustomerValidationScheme),
    validateAllowedFields(Object.keys(createCustomerValidationScheme)),
    validate,
    customerCreateController
);


export default router;