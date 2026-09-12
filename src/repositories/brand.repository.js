import { Brand } from "../mongoose/schemas/brand.js";

export const createBrandRepo = async (brandData) => {
    const newBrand = new Brand(brandData);
    const saved = await newBrand.save();
    return saved;
};

export const getBrandsRepo = async ({ page, limit, search }) => {
    const filter = { isDelete: { $ne: true } };
    if (search) {
        const regex = { $regex: search, $options: "i" };
        filter.$or = [
            { brand_name: regex },
            { id: regex }
        ];
    }
    const total = await Brand.countDocuments(filter);
    const effectivePage = page != null ? Number(page) : 1;
    const effectiveLimit = limit != null ? Number(limit) : 20;
    let query = Brand.find(filter).sort({ updatedAt: -1 });
    query = query.skip((effectivePage - 1) * effectiveLimit).limit(effectiveLimit);
    const brands = await query;
    const pagination = { page: effectivePage, limit: effectiveLimit, total };
    return { brands, pagination };
};

export const findBrandByIdRepo = async (id) => {
    return await Brand.findOne({ id, isDelete: { $ne: true } });
};

export const findBrandsByIdsRepo = async (ids) => {
    return await Brand.find({ id: { $in: ids }, isDelete: { $ne: true } });
};

export const updateBrandRepo = async (id, brandData) => {
    return await Brand.findOneAndUpdate({ id, isDelete: { $ne: true } }, brandData, { new: true, runValidators: true });
};

export const deleteBrandRepo = async (id) => {
    return await Brand.findOneAndUpdate({ id, isDelete: { $ne: true } }, { isDelete: true }, { new: true });
};

export const searchBrandIdsRepo = async (search) => {
    const regex = { $regex: search, $options: "i" };

    const brands = await Brand.find({
        brand_name: regex,
        isDelete: { $ne: true },
    }).select("id");

    return brands.map(brand => brand.id);
};