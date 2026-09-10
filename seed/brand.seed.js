// import mongoose from "mongoose";
// import { Brand } from "../src/mongoose/schemas/brand.js";
// import { env } from "../src/config/env.js";
// import { brands } from "./categoryBrand.seed.js";

// export { brands };

// const seedBrands = async () => {
//     try {
//         await mongoose.connect(env.MONGO_URI);
//         await Brand.deleteMany({});
//         await Brand.insertMany(brands);
//         console.log(`Brands seeded: ${brands.length}`);
//         await mongoose.disconnect();
//     } catch (error) {
//         console.error("Brand seeding failed:", error);
//         process.exit(1);
//     }
// };

// if (import.meta.url === `file://${process.argv[1]}`) {
//     seedBrands();
// }
