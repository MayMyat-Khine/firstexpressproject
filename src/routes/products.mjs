import { Router } from "express";
import { createProductValidationSchema, indexValidationSchema, updateProductValidationSchema } from "../utils/validationSchema.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { validate, validatePatchBody } from "../middlewares/validate.middleware.mjs";
import { productCreateController, productGetAllController, productDeleteByIdController, productGetByIdController, productUpdateByIdController, productsGetByBranchController } from "../controllers/product.controller.mjs";
import { authenticateUserMiddleware } from "../middlewares/authenticate.middleware.mjs";
import { authorizeMiddleware } from "../middlewares/authorize.middleware.mjs";
import { PERMISSIONS } from "../constants/permission.constant.mjs";

const router = Router();

router.post('/api/product',
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.PRODUCT_CREATE]),
    checkSchema(createProductValidationSchema),
    validate,
    productCreateController)

router.get("/api/products", authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.PRODUCT_VIEW]), productGetAllController)

router.get("/api/product/:id",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.PRODUCT_VIEW]),
    checkSchema(indexValidationSchema),
    validate,
    productGetByIdController)

router.get("/api/branch/:id/products",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.PRODUCT_VIEW]),
    checkSchema(indexValidationSchema),
    validate,
    productsGetByBranchController)

// actually the indexValidation is not working well here
// router.put("/api/product/:id",
//     checkSchema(indexValidationSchema),
//     findByProductId,
//     productUpdateByIdController
// )

router.patch("/api/product/:id",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.PRODUCT_UPDATE]),
    checkSchema(indexValidationSchema),
    validatePatchBody,
    checkSchema(updateProductValidationSchema),
    validate,
    productUpdateByIdController)

router.delete("/api/product/:id",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.PRODUCT_DELETE]),
    checkSchema(indexValidationSchema),
    validate,
    productDeleteByIdController
);


export default router;