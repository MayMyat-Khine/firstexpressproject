import { Router } from "express"
import { loginCustomer } from "../services/auth.service.mjs";
import { validate, validateAllowedFields, validatePatchBody } from "../middlewares/validate.middleware.mjs";
import { loginCustomerValidaionSchema, loginUserValidaionSchema } from "../utils/validationSchema.mjs";
import { checkSchema } from "express-validator";
import { loginCustomerController, loginUserController } from "../controllers/auth.controller.mjs";

const router = Router();

router.post("/api/loginCustomer",
    validatePatchBody,
    checkSchema(loginCustomerValidaionSchema),
    validateAllowedFields(Object.keys(loginCustomerValidaionSchema)),
    validate,
    loginCustomerController)


router.post("/api/loginUser",
    validatePatchBody,
    checkSchema(loginUserValidaionSchema),
    validateAllowedFields(Object.keys(loginUserValidaionSchema)),
    validate,
    loginUserController)


export default router;