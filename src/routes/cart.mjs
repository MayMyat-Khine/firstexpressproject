import { Router } from "express";
import { validate, validateAllowedFields, validatePatchBody } from "../middlewares/validate.middleware.mjs";
import { checkSchema } from "express-validator";
import { createCartController, getCartByCustomerController } from "../controllers/cart.controller.mjs";
import { createCartValidationSchema } from "../utils/validationSchema.mjs";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.mjs";

const router = Router();

router.post("/cart",
    authenticateMiddleware,
    validatePatchBody,
    checkSchema(createCartValidationSchema),
    validateAllowedFields(Object.keys(createCartValidationSchema)),
    validate,
    createCartController
)

router.get("/cart",
    authenticateMiddleware,
    getCartByCustomerController
)

export default router;