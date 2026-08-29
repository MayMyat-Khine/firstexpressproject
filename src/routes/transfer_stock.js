import { Router } from "express";
import { checkSchema } from "express-validator";
import { transferProductsBToBValidationSchema } from "../utils/validationSchema.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createTransferProductsController, getTransferProductsController } from '../controllers/transfer_products.controller.js';
import { authenticateUserMiddleware } from "../middlewares/authenticate.middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize.middleware.js";
import { PERMISSIONS } from "../constants/permission.constant.js";

const router = Router();


router.post("/stock-transfer",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.TRANSFER_CREATE]),
    checkSchema(transferProductsBToBValidationSchema),
    validate,
    createTransferProductsController
);

router.get("/stock-transfer",
    authenticateUserMiddleware,
    authorizeMiddleware([PERMISSIONS.TRANSFER_VIEW]),
    getTransferProductsController
)
export default router;