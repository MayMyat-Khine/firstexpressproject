import { Router } from "express";
import { checkSchema } from "express-validator";
import { transferProductsBToBValidationSchema } from "../utils/validationSchema.mjs";
import { validate } from "../utils/validate.middleware.mjs";
import { createTransferProductsController } from '../controllers/transfer_products.controller.mjs';

const router = Router();


router.post("/api/stock-transfer",
    checkSchema(transferProductsBToBValidationSchema),
    validate,
    createTransferProductsController
);

export default router;