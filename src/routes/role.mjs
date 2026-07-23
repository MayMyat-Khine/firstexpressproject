import { Router } from "express";
import { createRoleController, updateRoleController } from "../controllers/role.controller.mjs";
import { validate, validateAllowedFields, validatePatchBody } from "../middlewares/validate.middleware.mjs";
import { checkSchema } from "express-validator";
import { createRoleValidationSchema, updateRoleValidationSchema } from "../utils/validationSchema.mjs";

const router = Router();

router.post('/api/role',
    validatePatchBody,
    checkSchema(createRoleValidationSchema),
    validateAllowedFields(Object.keys(createRoleValidationSchema)),
    validate,
    createRoleController)

router.patch('/api/role/:id',
    validatePatchBody,
    checkSchema(updateRoleValidationSchema),
    validateAllowedFields(Object.keys(updateRoleValidationSchema)),
    validate,
    updateRoleController)

export default router;