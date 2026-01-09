import { Router } from "express";
import userRouter from "./user.mjs";
import productRouter from "./products.mjs";
import stockRouter from "./stocks.mjs";
import orderRouter from "./order.mjs";
import branchRouter from "./branch.mjs";

const router = Router();

router.use(userRouter);
router.use(productRouter);
router.use(stockRouter);
router.use(orderRouter);
router.use(branchRouter);

export default router;