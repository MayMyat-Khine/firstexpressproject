
import { Country } from "../mongoose/schemas/country.mjs";

export const getAllCountriesRepo = async () => {
    return Country.find();
};

export const postCountriesRepo = async (countryData) => {
    console.log("Country Data", countryData)
    return Country.insertMany(countryData);
};


export const getDialCodeByCountryIdRepo = async (id) => {
    return await Country.findById(id).select("dialCode -_id");
};
