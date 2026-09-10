// import mongoose from "mongoose";
// import { Category } from "../src/mongoose/schemas/category.js";
// import { env } from "../src/config/env.js";
// import { categories } from "./categoryBrand.seed.js";

// export { categories };

// const seedCategories = async () => {
//     try {
//         await mongoose.connect(env.MONGO_URI);
//         await Category.deleteMany({});
//         await Category.insertMany(categories);
//         console.log(`Categories seeded: ${categories.length}`);
//         await mongoose.disconnect();
//     } catch (error) {
//         console.error("Category seeding failed:", error);
//         process.exit(1);
//     }
// };

// if (import.meta.url === `file://${process.argv[1]}`) {
//     seedCategories();
// }
