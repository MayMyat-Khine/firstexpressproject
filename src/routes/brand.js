import { Router } from "express";
import { checkSchema } from "express-validator";
import { createBrandValidationSchema, updateBrandValidationSchema, getBrandsPaginationValidationSchema, indexValidationSchema } from "../utils/validationSchema.js";
import { validate, validatePatchBody } from "../middlewares/validate.middleware.js";
import { brandCreateController, brandGetAllController, brandGetByIdController, brandUpdateController, brandDeleteController } from "../controllers/brand.controller.js";
import { authenticateUserMiddleware } from "../middlewares/authenticate.middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize.middleware.js";
import { PERMISSIONS } from "../constants/permission.constant.js";

const router = Router();

router.post("/brand",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.BRAND_CREATE]),
    checkSchema(createBrandValidationSchema),
    validate,
    brandCreateController);

router.get("/brands",
    checkSchema(getBrandsPaginationValidationSchema),
    validate,
    brandGetAllController);

router.get("/brand/:id",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.BRAND_VIEW]),
    checkSchema(indexValidationSchema),
    validate,
    brandGetByIdController);

router.patch("/brand/:id",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.BRAND_UPDATE]),
    checkSchema(indexValidationSchema),
    validatePatchBody,
    checkSchema(updateBrandValidationSchema),
    validate,
    brandUpdateController);

router.delete("/brand/:id",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.BRAND_DELETE]),
    checkSchema(indexValidationSchema),
    validate,
    brandDeleteController);

export default router;
