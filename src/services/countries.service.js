import * as countriesRepo from "../repositories/countries.repository.js";
import { countries } from "../config/constants.js";

export const getAllCountries = async () => {
    return countriesRepo.getAllCountriesRepo();
};

export const postCountries = async () => {
    return countriesRepo.postCountriesRepo(countries);
};

export const getDialCodeByCountryId = async (id) => {
    return await countriesRepo.getDialCodeByCountryIdRepo(id);
}