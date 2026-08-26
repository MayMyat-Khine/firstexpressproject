import { Router } from "express";
import { getAllCurrencyRatesController, postCurrencyRatesController } from "../controllers/currency_rates.controller.mjs";


const router = Router();

router.get("/currencyRates", getAllCurrencyRatesController);

router.post("/currencyRate", postCurrencyRatesController);

export default router;