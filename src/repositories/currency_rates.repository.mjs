import { CurrencyRate } from "../mongoose/schemas/currency_rate.mjs";

export const getAllCurrenciesRepo = async () => {
    return CurrencyRate.find();
};

export const postCurrenciesRepo = async (currencyData) => {
    return CurrencyRate.insertMany(currencyData);
};


export const getCurrencyByIdRepo = async (id) => {
    return await CurrencyRate.findById(id).select("dialCode -_id");
};

export const getCurrencyRateByCodeRepo = async (code) => {
    return await CurrencyRate.findOne({ code });
};
