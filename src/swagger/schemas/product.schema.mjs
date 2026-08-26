export const PricePairSchema = {
    type: "object",
    properties: {
        amount: {
            type: "number",
            minimum: 0,
            example: 5000
        },
        currency: {
            type: "string",
            description: "ISO currency code of this price pair",
            enum: ["MMK", "THB", "USD", "SGD"],
            example: "MMK"
        }
    },
    required: ["amount", "currency"]
};

const PriceListProperty = {
    type: "array",
    description: "List of price pairs per currency; must include a USD pair as the default",
    minItems: 1,
    items: {
        $ref: "#/components/schemas/PricePair"
    },
    example: [
        { amount: 5000, currency: "MMK" },
        { amount: 2.5, currency: "USD" }
    ]
};

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
        unit: {
            type: "string",
            description: "Selling unit (e.g. pcs, box, kg)",
            example: "pcs"
        },
        price: PriceListProperty
    },
    required: ["id", "product_name", "branch_id", "code", "unit", "price"]
};

export const ProductCreateRequestSchema = {
    type: "object",
    required: ["product_name", "branch_id", "code", "unit", "price", "images"],
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
        unit: {
            type: "string",
            description: "Selling unit (e.g. pcs, box, kg)",
            example: "pcs"
        },
        price: PriceListProperty,
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
        unit: {
            type: "string",
            description: "Selling unit (e.g. pcs, box, kg)",
            example: "box"
        },
        price: PriceListProperty,
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