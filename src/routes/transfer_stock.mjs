import { Router } from "express";
import { checkSchema } from "express-validator";
import { transferProductsBToBValidationSchema } from "../utils/validationSchema.mjs";
import { validate } from "../middlewares/validate.middleware.mjs";
import { createTransferProductsController, getTransferProductsController } from '../controllers/transfer_products.controller.mjs';

const router = Router();


router.post("/api/stock-transfer",
    checkSchema(transferProductsBToBValidationSchema),
    validate,
    createTransferProductsController
);

router.get("/api/stock-transfer",
    getTransferProductsController
)
export default router;