import { v4 as uuidv4 } from "uuid";
import * as brandRepo from "../repositories/brand.repository.js";
import { Brand } from "../mongoose/schemas/brand.js";
import { Product } from "../mongoose/schemas/product.js";
import AppErrors from "../utils/appErrors.js";

export const createBrand = async (brandData) => {
    const existing = await Brand.findOne({ brand_name: brandData.brand_name });
    if (existing) {
        throw new AppErrors(`Brand "${brandData.brand_name}" already exists`, 400);
    }
    const brandId = uuidv4();
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
    const productCount = await Product.countDocuments({ brand_id: id });
    if (productCount > 0) {
        throw new AppErrors("This brand can't be deleted as there are products under this brand", 400);
    }
    const deleted = await brandRepo.deleteBrandRepo(id);
    return deleted;
};
