import { Router } from "express";
import userRouter from "./user.mjs";
import productRouter from "./products.mjs";
import stockRouter from "./stocks.mjs";

const router = Router();

router.use(userRouter);
router.use(productRouter);
router.use(stockRouter);

export default router;