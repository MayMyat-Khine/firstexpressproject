import { getAllCurrencyRates, postCurrencyRates } from "../services/currency_rates.service.mjs";

export async function getAllCurrencyRatesController(req, res, next) {
    try {
        const rates = await getAllCurrencyRates();
        return res.status(200).json({ success: true, body: rates });
    } catch (error) {
        next(error);
    }
}

export async function postCurrencyRatesController(req, res, next) {
    try {
        const rates = await postCurrencyRates();
        return res.status(201).json({ success: true, body: rates });
    } catch (error) {
        next(error);
    }
}

