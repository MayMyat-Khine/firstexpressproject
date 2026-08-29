import { randomUUID } from "crypto";
import { Product } from "../src/mongoose/schemas/product.js";
import { env } from "../src/config/env.js";
import mongoose from "mongoose";
import { STOCK_NAMESPACE } from "../src/config/constants.js";
import { Stock } from "../src/mongoose/schemas/stock.js";
import { v5 as uuidv5 } from "uuid";

export const products = [
    {
        id: randomUUID(),
        product_name: "Coca Cola",
        code: "DR-001",
        description: "Classic Coca Cola soft drink",
        branch_id: ["O-001", "O-002"],
        unit: "bottle",
        price: [
            { amount: 0.5, currency: "USD" },
            { amount: 1500, currency: "MMK" },
            { amount: 17, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Pepsi",
        code: "DR-002",
        description: "Pepsi cola soft drink",
        branch_id: ["O-001", "O-002"],
        unit: "bottle",
        price: [
            { amount: 0.5, currency: "USD" },
            { amount: 1500, currency: "MMK" },
            { amount: 17, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Sprite",
        code: "DR-003",
        description: "Lemon lime soft drink",
        branch_id: ["O-001"],
        unit: "bottle",
        price: [
            { amount: 0.5, currency: "USD" },
            { amount: 1500, currency: "MMK" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Fanta Orange",
        code: "DR-004",
        description: "Orange flavored soft drink",
        branch_id: ["O-001", "O-003"],
        unit: "bottle",
        price: [
            { amount: 0.6, currency: "USD" },
            { amount: 1800, currency: "MMK" },
            { amount: 20, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Mineral Water",
        code: "DR-005",
        description: "Pure drinking water",
        branch_id: ["O-001", "O-002", "O-003"],
        unit: "bottle",
        price: [
            { amount: 0.3, currency: "USD" },
            { amount: 800, currency: "MMK" },
            { amount: 10, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Green Tea",
        code: "DR-006",
        description: "Ready to drink green tea",
        branch_id: ["O-002"],
        unit: "bottle",
        price: [
            { amount: 1.2, currency: "USD" },
            { amount: 40, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Orange Juice",
        code: "DR-007",
        description: "100% orange flavored juice",
        branch_id: ["O-001", "O-002"],
        unit: "bottle",
        price: [
            { amount: 1.5, currency: "USD" },
            { amount: 5000, currency: "MMK" },
            { amount: 55, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Nescafe Classic",
        code: "CF-001",
        description: "Instant coffee",
        branch_id: ["O-001", "O-003"],
        unit: "jar",
        price: [
            { amount: 8, currency: "USD" },
            { amount: 18000, currency: "MMK" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Nescafe Gold",
        code: "CF-002",
        description: "Premium instant coffee",
        branch_id: ["O-001", "O-002"],
        unit: "jar",
        price: [
            { amount: 12, currency: "USD" },
            { amount: 40000, currency: "MMK" },
            { amount: 390, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Coffee Mix 3 in 1",
        code: "CF-003",
        description: "Instant three in one coffee mix",
        branch_id: ["O-001"],
        unit: "pack",
        price: [
            { amount: 2, currency: "USD" },
            { amount: 6000, currency: "MMK" },
            { amount: 65, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Potato Chips Original",
        code: "SN-001",
        description: "Classic salted potato chips",
        branch_id: ["O-001", "O-002"],
        unit: "pack",
        price: [
            { amount: 1.5, currency: "USD" },
            { amount: 4500, currency: "MMK" },
            { amount: 50, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Potato Chips BBQ",
        code: "SN-002",
        description: "BBQ flavored potato chips",
        branch_id: ["O-001"],
        unit: "pack",
        price: [
            { amount: 1.5, currency: "USD" },
            { amount: 4500, currency: "MMK" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Pringles Original",
        code: "SN-003",
        description: "Original potato crisps",
        branch_id: ["O-002"],
        unit: "can",
        price: [
            { amount: 2.5, currency: "USD" },
            { amount: 85, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Chocolate Bar",
        code: "SN-004",
        description: "Milk chocolate bar",
        branch_id: ["O-001", "O-003"],
        unit: "piece",
        price: [
            { amount: 1, currency: "USD" },
            { amount: 3000, currency: "MMK" },
            { amount: 35, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Oreo Cookies",
        code: "SN-005",
        description: "Chocolate sandwich cookies",
        branch_id: ["O-001", "O-002"],
        unit: "pack",
        price: [
            { amount: 2, currency: "USD" },
            { amount: 6000, currency: "MMK" },
            { amount: 65, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Instant Noodles Chicken",
        code: "FD-001",
        description: "Chicken flavored instant noodles",
        branch_id: ["O-001", "O-002", "O-003"],
        unit: "pack",
        price: [
            { amount: 0.7, currency: "USD" },
            { amount: 2000, currency: "MMK" },
            { amount: 25, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Instant Noodles Seafood",
        code: "FD-002",
        description: "Seafood flavored instant noodles",
        branch_id: ["O-001"],
        unit: "pack",
        price: [
            { amount: 0.8, currency: "USD" },
            { amount: 2300, currency: "MMK" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Jasmine Rice",
        code: "FD-003",
        description: "Premium jasmine rice",
        branch_id: ["O-001", "O-002"],
        unit: "bag",
        price: [
            { amount: 12, currency: "USD" },
            { amount: 40000, currency: "MMK" },
            { amount: 390, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "White Sugar",
        code: "FD-004",
        description: "Refined white sugar",
        branch_id: ["O-001"],
        unit: "kg",
        price: [
            { amount: 1.2, currency: "USD" },
            { amount: 4000, currency: "MMK" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Cooking Oil",
        code: "FD-005",
        description: "Vegetable cooking oil",
        branch_id: ["O-001", "O-003"],
        unit: "bottle",
        price: [
            { amount: 4, currency: "USD" },
            { amount: 13000, currency: "MMK" },
            { amount: 130, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Fish Sauce",
        code: "FD-006",
        description: "Traditional fish sauce",
        branch_id: ["O-002"],
        unit: "bottle",
        price: [
            { amount: 2.5, currency: "USD" },
            { amount: 85, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Soy Sauce",
        code: "FD-007",
        description: "Light soy sauce",
        branch_id: ["O-001", "O-002"],
        unit: "bottle",
        price: [
            { amount: 2, currency: "USD" },
            { amount: 6500, currency: "MMK" },
            { amount: 65, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Tomato Sauce",
        code: "FD-008",
        description: "Tomato ketchup",
        branch_id: ["O-001"],
        unit: "bottle",
        price: [
            { amount: 3, currency: "USD" },
            { amount: 9500, currency: "MMK" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Shampoo",
        code: "PC-001",
        description: "Daily care shampoo",
        branch_id: ["O-001", "O-002"],
        unit: "bottle",
        price: [
            { amount: 5, currency: "USD" },
            { amount: 17000, currency: "MMK" },
            { amount: 165, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Conditioner",
        code: "PC-002",
        description: "Moisturizing hair conditioner",
        branch_id: ["O-001"],
        unit: "bottle",
        price: [
            { amount: 5.5, currency: "USD" },
            { amount: 18000, currency: "MMK" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Body Wash",
        code: "PC-003",
        description: "Refreshing body wash",
        branch_id: ["O-002"],
        unit: "bottle",
        price: [
            { amount: 6, currency: "USD" },
            { amount: 195, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Facial Cleanser",
        code: "PC-004",
        description: "Gentle facial cleanser",
        branch_id: ["O-001", "O-003"],
        unit: "tube",
        price: [
            { amount: 7, currency: "USD" },
            { amount: 23000, currency: "MMK" },
            { amount: 230, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Moisturizer",
        code: "PC-005",
        description: "Daily facial moisturizer",
        branch_id: ["O-001"],
        unit: "jar",
        price: [
            { amount: 9, currency: "USD" },
            { amount: 30000, currency: "MMK" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Hand Cream",
        code: "PC-006",
        description: "Moisturizing hand cream",
        branch_id: ["O-002"],
        unit: "tube",
        price: [
            { amount: 4, currency: "USD" },
            { amount: 130, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Toothpaste",
        code: "PC-007",
        description: "Fresh mint toothpaste",
        branch_id: ["O-001", "O-002"],
        unit: "tube",
        price: [
            { amount: 2.5, currency: "USD" },
            { amount: 8000, currency: "MMK" },
            { amount: 80, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Toothbrush",
        code: "PC-008",
        description: "Soft bristle toothbrush",
        branch_id: ["O-001"],
        unit: "piece",
        price: [
            { amount: 1.5, currency: "USD" },
            { amount: 5000, currency: "MMK" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Laundry Detergent",
        code: "HC-001",
        description: "Laundry detergent powder",
        branch_id: ["O-001", "O-003"],
        unit: "pack",
        price: [
            { amount: 6, currency: "USD" },
            { amount: 20000, currency: "MMK" },
            { amount: 195, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Dishwashing Liquid",
        code: "HC-002",
        description: "Lemon scented dishwashing liquid",
        branch_id: ["O-001"],
        unit: "bottle",
        price: [
            { amount: 3, currency: "USD" },
            { amount: 10000, currency: "MMK" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Tissue Box",
        code: "HC-003",
        description: "Soft facial tissue",
        branch_id: ["O-001", "O-002"],
        unit: "box",
        price: [
            { amount: 2, currency: "USD" },
            { amount: 6500, currency: "MMK" },
            { amount: 65, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Paper Towels",
        code: "HC-004",
        description: "Absorbent kitchen paper towels",
        branch_id: ["O-002"],
        unit: "pack",
        price: [
            { amount: 3.5, currency: "USD" },
            { amount: 115, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Garbage Bags",
        code: "HC-005",
        description: "Heavy duty garbage bags",
        branch_id: ["O-001"],
        unit: "pack",
        price: [
            { amount: 2.5, currency: "USD" },
            { amount: 8000, currency: "MMK" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Notebook",
        code: "ST-001",
        description: "A5 lined notebook",
        branch_id: ["O-001", "O-002"],
        unit: "piece",
        price: [
            { amount: 2, currency: "USD" },
            { amount: 6500, currency: "MMK" },
            { amount: 65, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Ballpoint Pen",
        code: "ST-002",
        description: "Blue ink ballpoint pen",
        branch_id: ["O-001"],
        unit: "piece",
        price: [
            { amount: 0.5, currency: "USD" },
            { amount: 1500, currency: "MMK" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Pencil",
        code: "ST-003",
        description: "HB graphite pencil",
        branch_id: ["O-001", "O-003"],
        unit: "piece",
        price: [
            { amount: 0.3, currency: "USD" },
            { amount: 1000, currency: "MMK" },
            { amount: 10, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Eraser",
        code: "ST-004",
        description: "White rubber eraser",
        branch_id: ["O-002"],
        unit: "piece",
        price: [
            { amount: 0.4, currency: "USD" },
            { amount: 12, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Marker Set",
        code: "ST-005",
        description: "Color marker set",
        branch_id: ["O-001"],
        unit: "set",
        price: [
            { amount: 4, currency: "USD" },
            { amount: 13000, currency: "MMK" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "USB Cable",
        code: "EL-001",
        description: "USB Type-C charging cable",
        branch_id: ["O-001", "O-002"],
        unit: "piece",
        price: [
            { amount: 5, currency: "USD" },
            { amount: 16500, currency: "MMK" },
            { amount: 165, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Power Adapter",
        code: "EL-002",
        description: "20W USB power adapter",
        branch_id: ["O-001"],
        unit: "piece",
        price: [
            { amount: 15, currency: "USD" },
            { amount: 49000, currency: "MMK" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Wireless Mouse",
        code: "EL-003",
        description: "Wireless optical mouse",
        branch_id: ["O-002"],
        unit: "piece",
        price: [
            { amount: 12, currency: "USD" },
            { amount: 390, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Keyboard",
        code: "EL-004",
        description: "Wireless computer keyboard",
        branch_id: ["O-001", "O-003"],
        unit: "piece",
        price: [
            { amount: 20, currency: "USD" },
            { amount: 65000, currency: "MMK" },
            { amount: 650, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Bluetooth Speaker",
        code: "EL-005",
        description: "Portable Bluetooth speaker",
        branch_id: ["O-001"],
        unit: "piece",
        price: [
            { amount: 30, currency: "USD" },
            { amount: 100000, currency: "MMK" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Lipstick",
        code: "BT-001",
        description: "Long lasting matte lipstick",
        branch_id: ["O-001", "O-002"],
        unit: "piece",
        price: [
            { amount: 8, currency: "USD" },
            { amount: 27000, currency: "MMK" },
            { amount: 260, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Lip Gloss",
        code: "BT-002",
        description: "Glossy lip shine",
        branch_id: ["O-001"],
        unit: "piece",
        price: [
            { amount: 7, currency: "USD" },
            { amount: 23000, currency: "MMK" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Face Powder",
        code: "BT-003",
        description: "Compact face powder",
        branch_id: ["O-002"],
        unit: "piece",
        price: [
            { amount: 10, currency: "USD" },
            { amount: 325, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Perfume",
        code: "BT-004",
        description: "Floral fragrance perfume",
        branch_id: ["O-001", "O-003"],
        unit: "bottle",
        price: [
            { amount: 25, currency: "USD" },
            { amount: 82000, currency: "MMK" },
            { amount: 820, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Sunscreen",
        code: "BT-005",
        description: "SPF 50 sunscreen",
        branch_id: ["O-001"],
        unit: "tube",
        price: [
            { amount: 12, currency: "USD" },
            { amount: 390, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Baby Diapers",
        code: "BP-001",
        description: "Comfortable baby diapers",
        branch_id: ["O-001", "O-002"],
        unit: "pack",
        price: [
            { amount: 18, currency: "USD" },
            { amount: 59000, currency: "MMK" },
            { amount: 590, currency: "THB" }
        ],
        images: []
    },

    {
        id: randomUUID(),
        product_name: "Baby Wipes",
        code: "BP-002",
        description: "Gentle baby cleansing wipes",
        branch_id: ["O-001"],
        unit: "pack",
        price: [
            { amount: 4, currency: "USD" },
            { amount: 13000, currency: "MMK" }
        ],
        images: []
    }
];


const seedProducts = async () => {
    try {
        await mongoose.connect(env.MONGO_URI);

        await Product.deleteMany({});
        await Stock.deleteMany({});

        await Product.insertMany(products);

        await Stock.insertMany(stockData);
        console.log("Products seeded successfully");

        await mongoose.disconnect();
    } catch (error) {
        console.error("Product seeding failed:", error);
        process.exit(1);
    }
};


const initialStocks = {
    "DR-001:O-001": 10,
    "DR-004:O-001": 50,
    "DR-022:O-002": 25,
    "DR-003:O-002": 80,
    "DR-011:O-001": 10,
    "DR-001:O-001": 50,
    "DR-026:O-002": 25,
    "DR-013:O-002": 80,
    "DR-029:O-001": 10,
    "DR-024:O-001": 50,
    "DR-028:O-002": 25,
    "DR-013:O-002": 80,
};

const getInitialStock = (productCode, branchId) => {
    return initialStocks[`${productCode}:${branchId}`] ?? 0;
};

const stockData = products.flatMap((product) =>
    product.branch_id.map((branchId) => ({
        id: uuidv5(
            `${product.code}:${branchId}`,
            STOCK_NAMESPACE
        ),
        product_id: product.id,
        branch_id: branchId,
        stock: getInitialStock(product.code, branchId),
        low_stock: 10
    }))
);

seedProducts();