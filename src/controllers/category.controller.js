import { matchedData } from "express-validator";
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from "../services/category.service.js";

export async function categoryCreateController(req, res, next) {
    try {
        const validData = matchedData(req);
        const saved = await createCategory(validData);
        return res.status(201).json({ success: true, body: saved });
    } catch (error) {
        next(error);
    }
}

export async function categoryGetAllController(req, res, next) {
    try {
        const validateData = matchedData(req);
        const { categories, pagination } = await getCategories(validateData);
        return res.json({ success: true, body: categories, pagination });
    } catch (error) {
        next(error);
    }
}

export async function categoryGetByIdController(req, res, next) {
    try {
        const { id } = req.params;
        const found = await getCategoryById(id);
        return res.status(200).json({ success: true, body: found });
    } catch (error) {
        next(error);
    }
}

export async function categoryUpdateController(req, res, next) {
    try {
        const { id } = req.params;
        const data = req.body;
        const updated = await updateCategory(id, data);
        return res.status(200).json({ success: true, body: updated });
    } catch (error) {
        next(error);
    }
}

export async function categoryDeleteController(req, res, next) {
    try {
        const { id } = req.params;
        await deleteCategory(id);
        return res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        next(error);
    }
}
