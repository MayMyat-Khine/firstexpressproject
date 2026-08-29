import { Router } from "express";
import { createProductValidationSchema, getProductsPaginationValidationSchema, indexValidationSchema, updateProductValidationSchema } from "../utils/validationSchema.js";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { validate, validatePatchBody } from "../middlewares/validate.middleware.js";
import { productCreateController, productGetAllController, productDeleteByIdController, productGetByIdController, productUpdateByIdController, productsGetByBranchController, productGetByBranchController } from "../controllers/product.controller.js";
import { authenticateMiddleware, authenticateUserMiddleware } from "../middlewares/authenticate.middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize.middleware.js";
import { PERMISSIONS } from "../constants/permission.constant.js";
import { uploadProductImage } from "../middlewares/upload.image.middleware.js";
import { parseProductFormData } from "../middlewares/parseProductFormData.middleware.js";

const router = Router();

router.post('/product',
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.PRODUCT_CREATE]),
    uploadProductImage.array("images", 10),
    parseProductFormData,
    checkSchema(createProductValidationSchema),
    validate,
    productCreateController)

router.patch("/product/:id",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.PRODUCT_UPDATE]),
    uploadProductImage.array("images", 10),
    parseProductFormData,
    checkSchema(indexValidationSchema),
    validatePatchBody,
    checkSchema(updateProductValidationSchema),
    validate,
    productUpdateByIdController)

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
    // authenticateUserMiddleware,
    // authorizeMiddleware([PERMISSIONS.PRODUCT_VIEW]),
    checkSchema(getProductsPaginationValidationSchema),
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
    checkSchema(getProductsPaginationValidationSchema),
    validate,
    productsGetByBranchController)


router.get("/customer/branch/:bid/product/:pid",

    // checkSchema(getProductsPaginationValidationSchema),
    // validate,
    productGetByBranchController)
router.get("/customer/branch/:id/products",
    authenticateMiddleware,
    checkSchema(indexValidationSchema),
    checkSchema(getProductsPaginationValidationSchema),
    validate,
    productsGetByBranchController)
// actually the indexValidation is not working well here
// router.put("/product/:id",
//     checkSchema(indexValidationSchema),
//     findByProductId,
//     productUpdateByIdController
// )



router.delete("/product/:id",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.PRODUCT_DELETE]),
    checkSchema(indexValidationSchema),
    validate,
    productDeleteByIdController
);


export default router;