import * as countriesRepo from "../repositories/countries.repository.mjs";
import { countries } from "../config/constants.mjs";

export const getAllCountries = async () => {
    return countriesRepo.getAllCountriesRepo();
};

export const postCountries = async () => {
    return countriesRepo.postCountriesRepo(countries);
};

export const getDialCodeByCountryId = async (id) => {
    return await countriesRepo.getDialCodeByCountryIdRepo(id);
}