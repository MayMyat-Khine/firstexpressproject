import { Router } from "express";
import { createRoleController, getRolesController, updateRoleController } from "../controllers/role.controller.js";
import { validate, validateAllowedFields, validatePatchBody } from "../middlewares/validate.middleware.js";
import { checkSchema } from "express-validator";
import { createRoleValidationSchema, updateRoleValidationSchema } from "../utils/validationSchema.js";
import { authenticateUserMiddleware } from "../middlewares/authenticate.middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize.middleware.js";
import { PERMISSIONS } from "../constants/permission.constant.js";

const router = Router();

router.post('/role',
    // authenticateUserMiddleware,
    // authorizeMiddleware([PERMISSIONS.ROLE_CREATE]),
    validatePatchBody,
    checkSchema(createRoleValidationSchema),
    validateAllowedFields(Object.keys(createRoleValidationSchema)),
    validate,
    createRoleController)

router.patch('/role/:id',
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.ROLE_UPDATE]),
    validatePatchBody,
    checkSchema(updateRoleValidationSchema),
    validateAllowedFields(Object.keys(updateRoleValidationSchema)),
    validate,
    updateRoleController)

router.get('/roles', getRolesController)

export default router;