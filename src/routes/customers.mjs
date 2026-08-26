import { Router } from "express";
import { checkSchema } from "express-validator";
import { createCustomerValidationScheme, updateCustomerValidationScheme } from "../utils/validationSchema.mjs";
import { validate, validateAllowedFields, validatePatchBody } from "../middlewares/validate.middleware.mjs";

import { customerCreateController, deleteCustomerController, getCustomersController, updateCustomerController } from "../controllers/customer.controller.mjs";
import { validateCreateAccount } from "../middlewares/credential.validate.middleware.mjs";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.mjs";
import { uploadProductImage } from "../middlewares/upload.image.middleware.mjs";

const router = Router();


router.post("/customer",
    validatePatchBody,
    checkSchema(createCustomerValidationScheme),
    validateAllowedFields(Object.keys(createCustomerValidationScheme)),
    validateCreateAccount,
    validate,
    customerCreateController
);

router.get("/customer", getCustomersController);

router.patch("/customer",
    authenticateMiddleware,
    uploadProductImage.single('image'),
    checkSchema(updateCustomerValidationScheme),
    validateAllowedFields(Object.keys(updateCustomerValidationScheme)),
    validate,
    updateCustomerController)

router.delete('/customer/:id', deleteCustomerController)

export default router;