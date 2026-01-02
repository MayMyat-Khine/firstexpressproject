import { Router } from "express";
import { checkSchema } from "express-validator";
import { createOrderValidationSchema, indexValidationSchema } from "../utils/validationSchema.mjs";
import { validate } from "../utils/validate.middleware.mjs";
import { orderCreateController, orderGetAllController, orderGetByIdController } from "../controllers/order.controller.mjs";
import { findByOrderId } from "../utils/middlewares.mjs";

const router = Router();

router.post("/api/order",
    checkSchema(createOrderValidationSchema),
    validate,
    orderCreateController
);

router.get("/api/orders", orderGetAllController);

router.get("/api/order/:id",
    checkSchema(indexValidationSchema),
    findByOrderId,
    orderGetByIdController
);
// router.put("/api/order/:id",);

export default router;