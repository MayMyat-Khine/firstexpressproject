import { getAllCountries, postCountries } from "../services/countries.service.js";

export async function getAllCountriesController(req, res, next) {
    try {
        const countries = await getAllCountries();
        return res.status(200).json({ success: true, body: countries });
    } catch (error) {
        next(error);
    }
}

export async function postCountriesController(req, res, next) {
    try {
        const countries = await postCountries();
        return res.status(201).json({ success: true, body: countries });
    } catch (error) {
        next(error);
    }
}

