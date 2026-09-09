import { matchedData } from "express-validator";
import { createBrand, getBrands, getBrandById, updateBrand, deleteBrand } from "../services/brand.service.js";

export async function brandCreateController(req, res, next) {
    try {
        const validData = matchedData(req);
        const saved = await createBrand(validData);
        return res.status(201).json({ success: true, body: saved });
    } catch (error) {
        next(error);
    }
}

export async function brandGetAllController(req, res, next) {
    try {
        const validateData = matchedData(req);
        const { brands, pagination } = await getBrands(validateData);
        return res.json({ success: true, body: brands, pagination });
    } catch (error) {
        next(error);
    }
}

export async function brandGetByIdController(req, res, next) {
    try {
        const { id } = req.params;
        const found = await getBrandById(id);
        return res.status(200).json({ success: true, body: found });
    } catch (error) {
        next(error);
    }
}

export async function brandUpdateController(req, res, next) {
    try {
        const { id } = req.params;
        const data = req.body;
        const updated = await updateBrand(id, data);
        return res.status(200).json({ success: true, body: updated });
    } catch (error) {
        next(error);
    }
}

export async function brandDeleteController(req, res, next) {
    try {
        const { id } = req.params;
        await deleteBrand(id);
        return res.status(200).json({ success: true, message: "Brand deleted successfully" });
    } catch (error) {
        next(error);
    }
}
