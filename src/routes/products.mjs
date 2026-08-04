import { Router } from "express";
import { createProductValidationSchema, getPaginationValidationSchema, indexValidationSchema, updateProductValidationSchema } from "../utils/validationSchema.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { validate, validatePatchBody } from "../middlewares/validate.middleware.mjs";
import { productCreateController, productGetAllController, productDeleteByIdController, productGetByIdController, productUpdateByIdController, productsGetByBranchController } from "../controllers/product.controller.mjs";
import { authenticateUserMiddleware } from "../middlewares/authenticate.middleware.mjs";
import { authorizeMiddleware } from "../middlewares/authorize.middleware.mjs";
import { PERMISSIONS } from "../constants/permission.constant.mjs";
import { uploadProductImage } from "../middlewares/upload.image.middleware.mjs";
import { parseProductFormData } from "../middlewares/parseProductFormData.middleware.mjs";

const router = Router();

router.post('/product',
    // authenticateUserMiddleware,
    uploadProductImage.array("images", 10),
    parseProductFormData,
    checkSchema(createProductValidationSchema),
    validate,
    productCreateController)

// /**
// * @openapi
// * /products:
// *   get:
// *     summary: Get all products
// *     tags:
// *       - Products
// *     responses:
// *       200:
// *         description: Product list
// */
router.get("/products",
    //  authenticateUserMiddleware,
    // authorizeMiddleware([PERMISSIONS.PRODUCT_VIEW]),
    checkSchema(getPaginationValidationSchema),
    validate,
    productGetAllController)

router.get("/product/:id",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.PRODUCT_VIEW]),
    checkSchema(indexValidationSchema),
    validate,
    productGetByIdController)

router.get("/branch/:id/products",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.PRODUCT_VIEW]),
    checkSchema(indexValidationSchema),
    validate,
    productsGetByBranchController)

// actually the indexValidation is not working well here
// router.put("/product/:id",
//     checkSchema(indexValidationSchema),
//     findByProductId,
//     productUpdateByIdController
// )

router.patch("/product/:id",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.PRODUCT_UPDATE]),
    checkSchema(indexValidationSchema),
    validatePatchBody,
    checkSchema(updateProductValidationSchema),
    validate,
    productUpdateByIdController)

router.delete("/product/:id",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.PRODUCT_DELETE]),
    checkSchema(indexValidationSchema),
    validate,
    productDeleteByIdController
);


export default router;