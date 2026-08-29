import * as currencyRatesRepo from "../repositories/currency_rates.repository.js";
import { currencyRates } from "../config/constants.js";

export const getAllCurrencyRates = async () => {
    return currencyRatesRepo.getAllCurrenciesRepo();
};

export const postCurrencyRates = async () => {
    return currencyRatesRepo.postCurrenciesRepo(currencyRates);
};

export const getDialCodeByCurrenyRateId = async (id) => {
    return await currencyRatesRepo.getCurrencyByIdRepo(id);
}

export const getCurrencyRateByCode = async (code) => {
    return await currencyRatesRepo.getCurrencyRateByCodeRepo(code);
}