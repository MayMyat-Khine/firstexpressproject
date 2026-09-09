export const CategorySchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            example: "a1b2c3d4-5e6f-4a7b-8c9d-9e0f1a2b3c4d"
        },
        category_name: {
            type: "string",
            example: "Beverages"
        },
        brand_ids: {
            type: "array",
            items: { type: "string", example: "b2c3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e" },
            example: ["b2c3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e"]
        },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" }
    },
    required: ["id", "category_name"]
};

export const CategoryCreateRequestSchema = {
    type: "object",
    required: ["category_name"],
    properties: {
        category_name: {
            type: "string",
            example: "Beverages"
        },
        brand_ids: {
            type: "array",
            items: { type: "string", example: "b2c3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e" },
            example: ["b2c3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e"]
        }
    }
};

export const CategoryUpdateRequestSchema = {
    type: "object",
    properties: {
        category_name: {
            type: "string",
            example: "Updated Beverages"
        },
        brand_ids: {
            type: "array",
            items: { type: "string", example: "b2c3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e" },
            example: ["b2c3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e"]
        }
    }
};
