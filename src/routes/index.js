import { Router } from "express";
import userRouter from "./user.js";
import productRouter from "./products.js";
import stockRouter from "./stocks.js";
import orderRouter from "./order.js";
import branchRouter from "./branch.js";
import stockTransferRouter from './transfer_stock.js';
import customer from "./customers.js";
import auth from "./auth.js";
import permission from "./permission.js";
import role from './role.js';
import cart from './cart.js';
import countryRouter from "./countries.js";
import currencyRates from "./currency_rates.js";
import categoryRouter from "./category.js";
import brandRouter from "./brand.js";

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
router.use(cart);
router.use(countryRouter);
router.use(currencyRates);
router.use(categoryRouter);
router.use(brandRouter);

export default router;