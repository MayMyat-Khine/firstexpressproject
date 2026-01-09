import { Router } from "express";
import { checkSchema } from "express-validator";
import { createBranchValidationSchema, indexValidationSchema } from "../utils/validationSchema.mjs";
import { validate } from "../utils/validate.middleware.mjs";
import { branchCreateController, branchDeleteByIdController, branchGetAllController, branchGetByIdController, branchUpdatedByIdController } from "../controllers/branch.controller.mjs";
import { findByBranchId } from "../utils/middlewares.mjs";

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
    findByBranchId,
    branchGetByIdController
);

router.put('/api/branch/:id',
    checkSchema(indexValidationSchema),
    validate,
    findByBranchId,
    branchUpdatedByIdController
)

router.delete('/api/branch/:id',
    checkSchema(indexValidationSchema),
    validate,
    findByBranchId,
    branchDeleteByIdController
);

export default router;