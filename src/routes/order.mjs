import { Router } from "express";
import { checkSchema } from "express-validator";
import { createOrderValidationSchema, indexValidationSchema, updateOrderValidationSchema } from "../utils/validationSchema.mjs";
import { validate, validatePatchBody, validateAllowedFields } from "../middlewares/validate.middleware.mjs";
import { orderCreateController, orderGetAllController, orderGetByIdController, orderUpdateByIdController, orderGetByBranchController } from "../controllers/order.controller.mjs";
import { authenticateMiddleware, authenticateUserMiddleware } from "../middlewares/authenticate.middleware.mjs";
import { authorizeMiddleware } from "../middlewares/authorize.middleware.mjs";
import { PERMISSIONS } from "../constants/permission.constant.mjs";

const router = Router();

router.post("/api/order",
    authenticateMiddleware,
    authorizeMiddleware([PERMISSIONS.ORDER_CREATE]),
    checkSchema(createOrderValidationSchema),
    validate,
    authenticateMiddleware,
    orderCreateController
);

router.get("/api/orders", authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.ORDER_VIEW]),
    orderGetAllController);

router.get("/api/order/:id",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.ORDER_VIEW]),
    checkSchema(indexValidationSchema),
    validate,
    orderGetByIdController
);

router.get("/api/branch/:id/orders",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.ORDER_VIEW]),
    checkSchema(indexValidationSchema),
    validate,
    orderGetByBranchController
);

router.put("/api/order/:id",
    checkSchema(indexValidationSchema),
    validatePatchBody,
    checkSchema(updateOrderValidationSchema),
    validateAllowedFields(Object.keys(updateOrderValidationSchema)),
    validate,
    orderUpdateByIdController
);

export default router;