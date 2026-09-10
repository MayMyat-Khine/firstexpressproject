import mongoose from "mongoose";
import { Branch } from "../src/mongoose/schemas/branch.js";
import { env } from "../src/config/env.js";

export const branches = [
    {
        id: "O-001",
        name: "Yangon Downtown",
        address: "No.123, Anawrahta Road, Yangon",
        contact: "09-123456789"
    },
    {
        id: "O-002",
        name: "Mandalay Central",
        address: "No.45, 78th Street, Mandalay",
        contact: "09-234567890"
    },
    {
        id: "O-003",
        name: "Naypyidaw Branch",
        address: "No.78, Yaza Thingaha Road, Naypyidaw",
        contact: "09-345678901"
    },
    {
        id: "O-004",
        name: "Bago Branch",
        address: "No.12, Main Road, Bago",
        contact: "09-456789012"
    },
    {
        id: "Online-001",
        name: "Online Store",
        address: "Online",
        contact: "09-999999999"
    }
];

const seedBranches = async () => {
    try {
        await mongoose.connect(env.MONGO_URI);
        await Branch.deleteMany({});
        await Branch.insertMany(branches);
        console.log(`Branches seeded: ${branches.length}`);
        await mongoose.disconnect();
    } catch (error) {
        console.error("Branch seeding failed:", error);
        process.exit(1);
    }
};

// Run directly: node seed/branch.seed.js
if (import.meta.url === `file://${process.argv[1]}`) {
    seedBranches();
}
