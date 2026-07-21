import { Router } from "express"
import { loginCustomer } from "../services/auth.service.mjs";
import { validate, validateAllowedFields, validatePatchBody } from "../middlewares/validate.middleware.mjs";
import { registerValidaionSchema } from "../utils/validationSchema.mjs";
import { checkSchema } from "express-validator";
import { loginCustomerController } from "../controllers/auth.controller.mjs";

const router = Router();

router.post("/api/login",
    validatePatchBody,
    checkSchema(registerValidaionSchema),
    validateAllowedFields(Object.keys(registerValidaionSchema)),
    validate,
    loginCustomerController)


export default router;