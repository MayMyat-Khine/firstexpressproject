import { Router } from "express";
import { checkSchema } from "express-validator";
import { createCategoryValidationSchema, updateCategoryValidationSchema, getCategoriesPaginationValidationSchema, indexValidationSchema } from "../utils/validationSchema.js";
import { validate, validatePatchBody } from "../middlewares/validate.middleware.js";
import { categoryCreateController, categoryGetAllController, categoryGetByIdController, categoryUpdateController, categoryDeleteController } from "../controllers/category.controller.js";
import { authenticateUserMiddleware } from "../middlewares/authenticate.middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize.middleware.js";
import { PERMISSIONS } from "../constants/permission.constant.js";

const router = Router();

router.post("/category",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.CATEGORY_CREATE]),
    checkSchema(createCategoryValidationSchema),
    validate,
    categoryCreateController);

router.get("/categories",
    checkSchema(getCategoriesPaginationValidationSchema),
    validate,
    categoryGetAllController);

router.get("/category/:id",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.CATEGORY_VIEW]),
    checkSchema(indexValidationSchema),
    validate,
    categoryGetByIdController);

router.patch("/category/:id",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.CATEGORY_UPDATE]),
    checkSchema(indexValidationSchema),
    validatePatchBody,
    checkSchema(updateCategoryValidationSchema),
    validate,
    categoryUpdateController);

router.delete("/category/:id",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.CATEGORY_DELETE]),
    checkSchema(indexValidationSchema),
    validate,
    categoryDeleteController);

export default router;
