import { Router } from "express";
import { checkSchema } from "express-validator";
import { createOrderValidationSchema } from "../utils/validationSchema.mjs";
import { validate } from "../utils/validate.middleware.mjs";
import { orderCreateController } from "../controllers/addToCart.controller.mjs";

const router = Router();

router.post("/api/order",
    checkSchema(createOrderValidationSchema),
    validate,
    orderCreateController
);