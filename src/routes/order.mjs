import { Router } from "express";
import { checkSchema } from "express-validator";
import { createOrderValidationSchema, indexValidationSchema, updateOrderValidationSchema } from "../utils/validationSchema.mjs";
import { validate, validatePatchBody, validateAllowedFields } from "../middlewares/validate.middleware.mjs";
import { orderCreateController, orderGetAllController, orderGetByIdController, orderUpdateByIdController, orderGetByBranchController } from "../controllers/order.controller.mjs";

const router = Router();

router.post("/api/order",
    checkSchema(createOrderValidationSchema),
    validate,
    orderCreateController
);

router.get("/api/orders", orderGetAllController);

router.get("/api/order/:id",
    checkSchema(indexValidationSchema),
    validate,
    orderGetByIdController
);

router.get("/api/branch/:id/orders",
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