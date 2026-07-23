import { Router } from "express";
import userRouter from "./user.mjs";
import productRouter from "./products.mjs";
import stockRouter from "./stocks.mjs";
import orderRouter from "./order.mjs";
import branchRouter from "./branch.mjs";
import stockTransferRouter from './transfer_stock.mjs';
import customer from "./customers.mjs";
import auth from "./auth.mjs";
import permission from "./permission.mjs";
import role from './role.mjs';

const router = Router();

router.use(userRouter);
router.use(productRouter);
router.use(stockRouter);
router.use(orderRouter);
router.use(branchRouter);
router.use(stockTransferRouter);
router.use(customer);
router.use(auth);
router.use(permission);
router.use(role);

export default router;