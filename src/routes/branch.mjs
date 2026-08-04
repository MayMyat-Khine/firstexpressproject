import { Router } from "express";
import { checkSchema } from "express-validator";
import { createBranchValidationSchema, indexValidationSchema, updateBranchValidationSchema } from "../utils/validationSchema.mjs";
import { validate, validatePatchBody } from "../middlewares/validate.middleware.mjs";
import { branchCreateController, branchDeleteController, branchGetAllController, branchGetByIdController, branchUpdateByIdController } from "../controllers/branch.controller.mjs";
import { updateBranch } from "../services/branch.service.mjs";
import { authenticateMiddleware, authenticateUserMiddleware } from "../middlewares/authenticate.middleware.mjs";
import { authorizeMiddleware } from "../middlewares/authorize.middleware.mjs";
import { PERMISSIONS } from "../constants/permission.constant.mjs";

const router = Router();

router.post("/branch",
    // authenticateUserMiddleware,
    // authorizeMiddleware([PERMISSIONS.BRANCH_CREATE]),
    checkSchema(createBranchValidationSchema),
    validate,
    branchCreateController);

router.get("/branches",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.BRANCH_VIEW]),
    branchGetAllController
);

router.get('/branch/:id',
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.BRANCH_VIEW]),
    checkSchema(indexValidationSchema),
    validate,
    branchGetByIdController
);

router.patch('/branch/:id',
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.BRANCH_UPDATE]),
    checkSchema(indexValidationSchema),
    validatePatchBody,
    checkSchema(updateBranchValidationSchema),
    validate,
    branchUpdateByIdController
)

router.delete('/branch/:id',
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.BRANCH_DELETE]),
    checkSchema(indexValidationSchema),
    validate,
    branchDeleteController
);

export default router;