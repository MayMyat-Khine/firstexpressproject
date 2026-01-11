import { Router } from "express";
import { checkSchema } from "express-validator";
import { transferProductsBToBValidationSchema } from "../utils/validationSchema.mjs";
import { validate } from "../utils/validate.middleware.mjs";

const router = Router();


router.post("/api/stock-transfer",
    checkSchema(transferProductsBToBValidationSchema),
    validate,
    trasferProductsController
);