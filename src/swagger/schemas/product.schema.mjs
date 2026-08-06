export const ProductSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            example: "65abc123"
        },
        product_name: {
            type: "string",
            example: "Lip Tint"
        },
        branch_id: {
            type: "array",
            items: {
                type: "string",
                example: "64f11c2d9b2e4a5f1c0a1234"
            },
            example: ["64f11c2d9b2e4a5f1c0a1234"]
        },
        description: {
            type: "string",
            example: "Velvety finish lip tint"
        },
        code: {
            type: "string",
            example: "LT-001"
        },
        price: {
            type: "number",
            example: 5000
        }
    },
    required: ["id", "product_name", "branch_id", "code", "price"]
};

export const ProductCreateRequestSchema = {
    type: "object",
    required: ["product_name", "branch_id", "code", "price", "images"],
    properties: {
        product_name: {
            type: "string",
            example: "Lip Tint"
        },
        branch_id: {
            type: "array",
            items: {
                type: "string",
                example: "64f11c2d9b2e4a5f1c0a1234"
            },
            example: ["64f11c2d9b2e4a5f1c0a1234"]
        },
        description: {
            type: "string",
            example: "Velvety finish lip tint"
        },
        code: {
            type: "string",
            example: "LT-001"
        },
        price: {
            type: "number",
            example: 5000
        },
        images: {
            type: "array",
            items: {
                type: "string",
                format: "binary"
            },
            minItems: 1,
            maxItems: 10
        }
    }
};

export const ProductUpdateRequestSchema = {
    type: "object",
    properties: {
        product_name: {
            type: "string",
            example: "Updated Lip Tint"
        },
        branch_id: {
            type: "array",
            items: {
                type: "string",
                example: "64f11c2d9b2e4a5f1c0a1234"
            },
            example: ["64f11c2d9b2e4a5f1c0a1234"]
        },
        description: {
            type: "string",
            example: "Updated description"
        },
        code: {
            type: "string",
            example: "LT-002"
        },
        price: {
            type: "number",
            example: 5500
        },
        images: {
            type: "array",
            items: {
                type: "string",
                format: "binary"
            },
            minItems: 1,
            maxItems: 10
        },
        delete_image: {
            type: "array",
            items: {
                type: "string",
                example: "abc.jpg"
            },
            example: ["abc.jpg"]
        },
    }
};