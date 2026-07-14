import { Router } from "express";
import { createProductValidationSchema, indexValidationSchema, updateProductValidationSchema } from "../utils/validationSchema.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { findByProductId, } from "../utils/middlewares.mjs";
import { validate, validatePatchBody } from "../utils/validate.middleware.mjs";
import { productCreateController, productGetAllController, productDeleteByIdController, productGetByIdController, productUpdateByIdController } from "../controllers/product.controller.mjs";

const router = Router();

router.post('/api/product',
    checkSchema(createProductValidationSchema),
    validate,
    productCreateController)

router.get("/api/products", productGetAllController)

router.get("/api/product/:id",
    checkSchema(indexValidationSchema),
    findByProductId,
    productGetByIdController)

// actually the indexValidation is not working well here
// router.put("/api/product/:id",
//     checkSchema(indexValidationSchema),
//     findByProductId,
//     productUpdateByIdController
// )

router.patch("/api/product/:id",
    checkSchema(indexValidationSchema),
    validatePatchBody,
    checkSchema(updateProductValidationSchema),
    validate,
    productUpdateByIdController)

router.delete("/api/product/:id",
    checkSchema(indexValidationSchema),
    findByProductId,
    productDeleteByIdController
);


export default router;