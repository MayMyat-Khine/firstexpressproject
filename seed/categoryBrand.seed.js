import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { Category } from "../src/mongoose/schemas/category.js";
import { Brand } from "../src/mongoose/schemas/brand.js";
import { env } from "../src/config/env.js";

// Real category names grouped by domain
const categoryNames = [
    // Clothing
    "Men's Clothing",
    "Women's Clothing",
    "Kids Wear",
    "Jeans & Denim",
    // Accessories
    "Bags & Handbags",
    "Jewelry",
    "Watches",
    "Sunglasses",
    // Skincare
    "Cleansers",
    "Moisturizers",
    "Sunscreen",
    "Treatments",
    // Cosmetics
    "Lip Products",
    "Face Makeup",
    "Eye Makeup",
    "Nails"
];

const brandNames = [
    // Clothing
    "Zara",
    "Uniqlo",
    "Nike",
    "H&M",
    "Adidas",
    // Accessories
    "Gucci",
    "Ray-Ban",
    "Fossil",
    "Louis Vuitton",
    // Skincare
    "CeraVe",
    "The Ordinary",
    "La Roche-Posay",
    "Neutrogena",
    // Cosmetics
    "Maybelline",
    "MAC",
    "L'Oreal",
    "Estee Lauder"
];

// Generate with uuidv4 and consistent linking
const generateCategoryBrandData = () => {
    const cats = categoryNames.map((name) => ({
        id: uuidv4(),
        category_name: name,
        brand_ids: []
    }));

    const brs = brandNames.map((name) => ({
        id: uuidv4(),
        brand_name: name,
        category_ids: []
    }));

    // Helper to pick random N from array
    const pickRandom = (arr, n) => [...arr].sort(() => 0.5 - Math.random()).slice(0, n);

    // Assign 2 random brands to each category
    cats.forEach((cat) => {
        const randomBrands = pickRandom(brs, 2);
        cat.brand_ids = randomBrands.map((b) => b.id);
    });

    // Now ensure brands' category_ids reflect categories that reference them (bidirectional)
    brs.forEach((brand) => {
        const linkedCats = cats.filter((c) => c.brand_ids.includes(brand.id));
        if (linkedCats.length > 0) {
            brand.category_ids = linkedCats.map((c) => c.id);
        } else {
            // Ensure at least 1-2 categories if not linked
            brand.category_ids = pickRandom(cats, 2).map((c) => c.id);
            // Also add this brand to those categories for consistency
            brand.category_ids.forEach((catId) => {
                const cat = cats.find((c) => c.id === catId);
                if (cat && !cat.brand_ids.includes(brand.id)) {
                    cat.brand_ids.push(brand.id);
                }
            });
        }
    });

    return { categories: cats, brands: brs };
};

const { categories, brands } = generateCategoryBrandData();

export { categories, brands };

export const seedCategoryBrand = async () => {
    await mongoose.connect(env.MONGO_URI);
    await Category.deleteMany({});
    await Category.insertMany(categories);
    console.log(`Categories seeded: ${categories.length}`);

    await Brand.deleteMany({});
    await Brand.insertMany(brands);
    console.log(`Brands seeded: ${brands.length}`);

    await mongoose.disconnect();
    console.log("Category & Brand seeding completed");
};

if (import.meta.url === `file://${process.argv[1]}`) {
    seedCategoryBrand().catch((e) => {
        console.error(e);
        process.exit(1);
    });
}
