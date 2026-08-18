export const OrderSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            example: "order_001"
        },
        branch_id: {
            type: "string",
            example: "branch_001"
        },
        purchase_products: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        example: "product_001"
                    },
                    quantity: {
                        type: "integer",
                        example: 2
                    },
                    price: {
                        type: "number",
                        example: 5000
                    },
                    subtotal: {
                        type: "number",
                        example: 10000
                    }
                },
                required: ["id", "quantity", "price", "subtotal"]
            }
        },
        subtotal: {
            type: "number",
            example: 10000
        },
        discount: {
            type: "number",
            example: 0
        },
        total_amount: {
            type: "number",
            example: 10000
        },
        payment_method: {
            type: "string",
            example: "cash"
        },
        status: {
            type: "string",
            example: "pending"
        },
        notes: {
            type: "string",
            example: "Please pack carefully"
        }
    },
    required: ["branch_id", "customer_id", "purchase_products", "subtotal", "total_amount", "payment_method"]
};

export const OrderCreateRequestSchema = {
    type: "object",
    required: ["branch_id", "customer_id", "purchase_products", "subtotal", "total_amount", "payment_method"],
    properties: {
        branch_id: {
            type: "string",
            example: "branch_001"
        },

        purchase_products: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        example: "product_001"
                    },
                    quantity: {
                        type: "integer",
                        example: 2
                    },
                    price: {
                        type: "number",
                        example: 5000
                    },
                    subtotal: {
                        type: "number",
                        example: 10000
                    }
                },
                required: ["id", "quantity", "price", "subtotal"]
            }
        },
        subtotal: {
            type: "number",
            example: 10000
        },
        discount: {
            type: "number",
            example: 0
        },
        total_amount: {
            type: "number",
            example: 10000
        },
        payment_method: {
            type: "string",
            example: "cash"
        },
        notes: {
            type: "string",
            example: "Please pack carefully"
        },
        address: {
            type: "string",
            example: "address"
        },

    }
};

export const OrderUpdateRequestSchema = {
    type: "object",
    properties: {
        notes: {
            type: "string",
            example: "Updated notes"
        },
        status: {
            type: "string",
            example: "completed"
        }
    }
};
