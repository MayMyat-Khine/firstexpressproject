import { Router } from "express";
import { checkSchema } from "express-validator";
import { createOrderValidationSchema, getPaginationValidationSchema, indexValidationSchema, updateOrderValidationSchema } from "../utils/validationSchema.mjs";
import { validate, validatePatchBody, validateAllowedFields } from "../middlewares/validate.middleware.mjs";
import { orderCreateController, orderGetAllController, orderGetByIdController, orderUpdateByIdController, orderGetByBranchController, orderGetMyOrdersController, orderGetMyOrderByIdController } from "../controllers/order.controller.mjs";
import { authenticateMiddleware, authenticateUserMiddleware } from "../middlewares/authenticate.middleware.mjs";
import { authorizeMiddleware } from "../middlewares/authorize.middleware.mjs";
import { PERMISSIONS } from "../constants/permission.constant.mjs";

const router = Router();

router.post("/api/order",
    authenticateMiddleware,
    checkSchema(createOrderValidationSchema),
    validate,
    orderCreateController
);

// == Customer == //
router.get("/api/orders/me",
    authenticateMiddleware,
    checkSchema(getPaginationValidationSchema),
    validate,
    orderGetMyOrdersController);

// == User == //
router.get("/api/orders",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.ORDER_VIEW]),
    checkSchema(getPaginationValidationSchema),
    validate,
    orderGetAllController);

// == Customer == //
router.get("/api/order/me/:id",
    authenticateMiddleware,
    checkSchema(indexValidationSchema),
    validate,
    orderGetMyOrderByIdController
);

// == User == //
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
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.ORDER_UPDATE]),
    checkSchema(indexValidationSchema),
    validatePatchBody,
    checkSchema(updateOrderValidationSchema),
    validateAllowedFields(Object.keys(updateOrderValidationSchema)),
    validate,
    orderUpdateByIdController
);

export default router;