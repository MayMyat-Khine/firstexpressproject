import { Router } from "express";
import { checkSchema } from "express-validator";
import { createOrderValidationSchema, getMyOrdersValidationSchema, getProductsPaginationValidationSchema, indexValidationSchema, updateOrderValidationSchema } from "../utils/validationSchema.js";
import { validate, validatePatchBody, validateAllowedFields } from "../middlewares/validate.middleware.js";
import { orderCreateController, orderGetAllController, orderGetByIdController, orderUpdateByIdController, orderGetByBranchController, orderGetMyOrdersController, orderGetMyOrderByIdController } from "../controllers/order.controller.js";
import { authenticateMiddleware, authenticateUserMiddleware } from "../middlewares/authenticate.middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize.middleware.js";
import { PERMISSIONS } from "../constants/permission.constant.js";

const router = Router();

router.post("/order",
    authenticateMiddleware,
    checkSchema(createOrderValidationSchema),
    validate,
    orderCreateController
);

// == Customer == //
router.get("/orders/me",
    authenticateMiddleware,
    checkSchema(getMyOrdersValidationSchema),
    validate,
    orderGetMyOrdersController);

// == Customer == //
router.get("/order/me/:id",
    authenticateMiddleware,
    checkSchema(indexValidationSchema),
    validate,
    orderGetMyOrderByIdController
);


// == User == //
router.get("/orders",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.ORDER_VIEW]),
    checkSchema(getProductsPaginationValidationSchema),
    validate,
    orderGetAllController);


// == User == //
router.get("/order/:id",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.ORDER_VIEW]),
    checkSchema(indexValidationSchema),
    validate,
    orderGetByIdController
);



router.get("/branch/:id/orders",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.ORDER_VIEW]),
    checkSchema(indexValidationSchema),
    validate,
    orderGetByBranchController
);

router.put("/order/:id",
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