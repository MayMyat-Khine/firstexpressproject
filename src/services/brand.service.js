import { v5 as uuidv5 } from "uuid";
import { BRAND_NAMESPACE } from "../config/constants.js";
import * as brandRepo from "../repositories/brand.repository.js";
import AppErrors from "../utils/appErrors.js";

export const createBrand = async (brandData) => {
    const brandKey = brandData.brand_name;
    const brandId = uuidv5(brandKey, BRAND_NAMESPACE);
    const existing = await brandRepo.findBrandByIdRepo(brandId);
    if (existing) {
        throw new AppErrors(`Brand "${brandData.brand_name}" already exists`, 400);
    }
    const payload = { ...brandData, id: brandId };
    return await brandRepo.createBrandRepo(payload);
};

export const getBrands = async ({ page, limit, search }) => {
    const safePage = page != null ? Number(page) : 1;
    const safeLimit = limit != null ? Math.min(Number(limit), 100) : 20;
    return await brandRepo.getBrandsRepo({ page: safePage, limit: safeLimit, search });
};

export const getBrandById = async (id) => {
    const found = await brandRepo.findBrandByIdRepo(id);
    if (!found) {
        throw new AppErrors(`Brand id ${id} is not found`, 404);
    }
    return found;
};

export const updateBrand = async (id, body) => {
    await getBrandById(id);
    const updated = await brandRepo.updateBrandRepo(id, body);
    if (!updated) {
        throw new AppErrors(`Failed to update Brand ${id}`, 400);
    }
    return updated;
};

export const deleteBrand = async (id) => {
    await getBrandById(id);
    const deleted = await brandRepo.deleteBrandRepo(id);
    return deleted;
};
