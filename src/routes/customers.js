import { Router } from "express";
import { checkSchema } from "express-validator";
import { createCustomerValidationScheme, updateCustomerValidationScheme } from "../utils/validationSchema.js";
import { validate, validateAllowedFields, validatePatchBody } from "../middlewares/validate.middleware.js";

import { customerCreateController, deleteCustomerController, getCustomersController, updateCustomerController } from "../controllers/customer.controller.js";
import { validateCreateAccount } from "../middlewares/credential.validate.middleware.js";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware.js";
import { uploadProductImage } from "../middlewares/upload.image.middleware.js";

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