export const BrandSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            example: "b2c3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e"
        },
        brand_name: {
            type: "string",
            example: "Coca-Cola"
        },
        category_ids: {
            type: "array",
            items: { type: "string", example: "a1b2c3d4-5e6f-4a7b-8c9d-9e0f1a2b3c4d" },
            example: ["a1b2c3d4-5e6f-4a7b-8c9d-9e0f1a2b3c4d"]
        },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" }
    },
    required: ["id", "brand_name"]
};

export const BrandCreateRequestSchema = {
    type: "object",
    required: ["brand_name"],
    properties: {
        brand_name: {
            type: "string",
            example: "Coca-Cola"
        },
        category_ids: {
            type: "array",
            items: { type: "string", example: "a1b2c3d4-5e6f-4a7b-8c9d-9e0f1a2b3c4d" },
            example: ["a1b2c3d4-5e6f-4a7b-8c9d-9e0f1a2b3c4d"]
        }
    }
};

export const BrandUpdateRequestSchema = {
    type: "object",
    properties: {
        brand_name: {
            type: "string",
            example: "Pepsi"
        },
        category_ids: {
            type: "array",
            items: { type: "string", example: "a1b2c3d4-5e6f-4a7b-8c9d-9e0f1a2b3c4d" },
            example: ["a1b2c3d4-5e6f-4a7b-8c9d-9e0f1a2b3c4d"]
        }
    }
};
