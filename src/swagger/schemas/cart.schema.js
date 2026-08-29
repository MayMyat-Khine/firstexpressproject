export const CartItemSchema = {
    type: "object",
    properties: {
        product_id: {
            type: "string",
            example: "prod_001"
        },
        quantity: {
            type: "integer",
            example: 2
        },
        price: {
            type: "number",
            example: 10000
        }
    },
    required: ["product_id", "quantity", "price"]
};

export const CartSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            example: "cart_001"
        },
        items: {
            type: "array",
            items: {
                $ref: "#/components/schemas/CartItem"
            }
        },
        createdAt: {
            type: "string",
            format: "date-time"
        },
        updatedAt: {
            type: "string",
            format: "date-time"
        }
    },
    // required: ["customer_id", "items"]
};

export const CartCreateRequestSchema = {
    type: "object",
    required: ["items"],
    properties: {
        items: {
            type: "array",
            items: {
                $ref: "#/components/schemas/CartItem"
            }
        }
    }
};
