import { Router } from "express"
import { validate, validateAllowedFields, validatePatchBody } from "../middlewares/validate.middleware.js";
import { loginCustomerValidaionSchema, loginUserValidaionSchema, refreshTokenValidaionSchema } from "../utils/validationSchema.js";
import { checkSchema } from "express-validator";
import { loginCustomerController, loginUserController, refreshTokenController } from "../controllers/auth.controller.js";

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