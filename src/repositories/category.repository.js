import { Category } from "../mongoose/schemas/category.js";

export const createCategoryRepo = async (categoryData) => {
    const newCategory = new Category(categoryData);
    const saved = await newCategory.save();
    return saved;
};

export const getCategoriesRepo = async ({ page, limit, search }) => {
    const filter = {};
    if (search) {
        const regex = { $regex: search, $options: "i" };
        filter.$or = [
            { category_name: regex },
            { id: regex }
        ];
    }
    const total = await Category.countDocuments(filter);
    const effectivePage = page != null ? Number(page) : 1;
    const effectiveLimit = limit != null ? Number(limit) : 20;
    let query = Category.find(filter).sort({ updatedAt: -1 });
    query = query.skip((effectivePage - 1) * effectiveLimit).limit(effectiveLimit);
    const categories = await query;
    const pagination = { page: effectivePage, limit: effectiveLimit, total };
    return { categories, pagination };
};

export const findCategoryByIdRepo = async (id) => {
    return await Category.findOne({ id });
};

export const findCategoriesByIdsRepo = async (ids) => {
    return await Category.find({ id: { $in: ids } });
};

export const updateCategoryRepo = async (id, categoryData) => {
    return await Category.findOneAndUpdate({ id }, categoryData, { new: true, runValidators: true });
};

export const deleteCategoryRepo = async (id) => {
    return await Category.findOneAndDelete({ id });
};
