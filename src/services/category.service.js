import { v4 as uuidv4 } from "uuid";
import * as categoryRepo from "../repositories/category.repository.js";
import { Category } from "../mongoose/schemas/category.js";
import { Product } from "../mongoose/schemas/product.js";
import AppErrors from "../utils/appErrors.js";

export const createCategory = async (categoryData) => {
    const existing = await Category.findOne({ category_name: categoryData.category_name });
    if (existing) {
        throw new AppErrors(`Category "${categoryData.category_name}" already exists`, 400);
    }
    const categoryId = uuidv4();
    const payload = { ...categoryData, id: categoryId };
    return await categoryRepo.createCategoryRepo(payload);
};

export const getCategories = async ({ page, limit, search }) => {
    const safePage = page != null ? Number(page) : 1;
    const safeLimit = limit != null ? Math.min(Number(limit), 100) : 20;
    return await categoryRepo.getCategoriesRepo({ page: safePage, limit: safeLimit, search });
};

export const getCategoryById = async (id) => {
    const found = await categoryRepo.findCategoryByIdRepo(id);
    if (!found) {
        throw new AppErrors(`Category id ${id} is not found`, 404);
    }
    return found;
};

export const updateCategory = async (id, body) => {
    await getCategoryById(id);
    const updated = await categoryRepo.updateCategoryRepo(id, body);
    if (!updated) {
        throw new AppErrors(`Failed to update Category ${id}`, 400);
    }
    return updated;
};

export const deleteCategory = async (id) => {
    await getCategoryById(id);
    const productCount = await Product.countDocuments({ category_id: id });
    if (productCount > 0) {
        throw new AppErrors("This category can't be deleted as there are products under this category", 400);
    }
    const deleted = await categoryRepo.deleteCategoryRepo(id);
    return deleted;
};
