import { Router } from "express"
import { loginCustomer } from "../services/auth.service.mjs";
import { validate, validateAllowedFields, validatePatchBody } from "../middlewares/validate.middleware.mjs";
import { loginCustomerValidaionSchema, loginUserValidaionSchema, refreshTokenValidaionSchema } from "../utils/validationSchema.mjs";
import { checkSchema } from "express-validator";
import { loginCustomerController, loginUserController, refreshTokenController } from "../controllers/auth.controller.mjs";

const router = Router();

router.post("/loginCustomer",
    validatePatchBody,
    checkSchema(loginCustomerValidaionSchema),
    validateAllowedFields(Object.keys(loginCustomerValidaionSchema)),
    validate,
    loginCustomerController)


router.post("/loginUser",
    validatePatchBody,
    checkSchema(loginUserValidaionSchema),
    validateAllowedFields(Object.keys(loginUserValidaionSchema)),
    validate,
    loginUserController)

router.post("/refreshToken",
    checkSchema(refreshTokenValidaionSchema),
    validate,
    refreshTokenController

)
export default router;