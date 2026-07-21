import { Router } from "express";
import { checkSchema } from "express-validator";
import { registerValidationSchema } from "../utils/validationSchema.mjs";
import { validate, validateAllowedFields, validatePatchBody } from "../middlewares/validate.middleware.mjs";

import { customerCreateController } from "../controllers/customer.controller.mjs";

const router = Router();


router.post("/api/customer",
    validatePatchBody,
    checkSchema(registerValidationSchema),
    validateAllowedFields(Object.keys(registerValidationSchema)),
    validate,
    customerCreateController
);


export default router;