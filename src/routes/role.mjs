import { Router } from "express";
import { createRoleController, updateRoleController } from "../controllers/role.controller.mjs";
import { validate, validateAllowedFields, validatePatchBody } from "../middlewares/validate.middleware.mjs";
import { checkSchema } from "express-validator";
import { createRoleValidationSchema, updateRoleValidationSchema } from "../utils/validationSchema.mjs";
import { authenticateUserMiddleware } from "../middlewares/authenticate.middleware.mjs";
import { authorizeMiddleware } from "../middlewares/authorize.middleware.mjs";
import { PERMISSIONS } from "../constants/permission.constant.mjs";

const router = Router();

router.post('/api/role',
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.ROLE_CREATE]),
    validatePatchBody,
    checkSchema(createRoleValidationSchema),
    validateAllowedFields(Object.keys(createRoleValidationSchema)),
    validate,
    createRoleController)

router.patch('/api/role/:id',
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.ROLE_UPDATE]),
    validatePatchBody,
    checkSchema(updateRoleValidationSchema),
    validateAllowedFields(Object.keys(updateRoleValidationSchema)),
    validate,
    updateRoleController)

export default router;