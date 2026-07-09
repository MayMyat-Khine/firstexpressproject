import { Router } from "express";
import { checkSchema } from "express-validator";
import { createBranchValidationSchema, indexValidationSchema, updateBranchValidationSchema } from "../utils/validationSchema.mjs";
import { validate, validatePatchBody } from "../utils/validate.middleware.mjs";
import { branchCreateController, branchDeleteController, branchGetAllController, branchGetByIdController, branchUpdatedController } from "../controllers/branch.controller.mjs";
import { findByBranchId } from "../utils/middlewares.mjs";
import { updateBranch } from "../services/branch.service.mjs";

const router = Router();

router.post("/api/branch",
    checkSchema(createBranchValidationSchema),
    validate,
    branchCreateController);

router.get("/api/branches",
    branchGetAllController
);

router.get('/api/branch/:id',
    checkSchema(indexValidationSchema),
    validate,
    branchGetByIdController
);

router.patch('/api/branch/:id',
    checkSchema(indexValidationSchema),
    validatePatchBody,
    checkSchema(updateBranchValidationSchema),
    validate,
    branchUpdatedController
)

router.delete('/api/branch/:id',
    checkSchema(indexValidationSchema),
    validate,
    branchDeleteController
);

export default router;