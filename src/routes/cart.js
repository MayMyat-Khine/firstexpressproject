import { Router } from "express";
import { validate, validateAllowedFields, validatePatchBody } from "../middlewares/validate.middleware.js";
import { checkSchema } from "express-validator";
import { createCartController, getCartByCustomerController } from "../controllers/cart.controller.js";
import { createCartValidationSchema } from "../utils/validationSchema.js";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.js";

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