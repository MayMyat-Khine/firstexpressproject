import { Router } from "express";
import { checkSchema } from "express-validator";
import { transferProductsBToBValidationSchema } from "../utils/validationSchema.mjs";
import { validate } from "../middlewares/validate.middleware.mjs";
import { createTransferProductsController, getTransferProductsController } from '../controllers/transfer_products.controller.mjs';
import { authenticateUserMiddleware } from "../middlewares/authenticate.middleware.mjs";
import { authorizeMiddleware } from "../middlewares/authorize.middleware.mjs";
import { PERMISSIONS } from "../constants/permission.constant.mjs";

const router = Router();


router.post("/api/stock-transfer",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.TRANSFER_CREATE]),
    checkSchema(transferProductsBToBValidationSchema),
    validate,
    createTransferProductsController
);

router.get("/api/stock-transfer",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.TRANSFER_VIEW]),
    getTransferProductsController
)
export default router;