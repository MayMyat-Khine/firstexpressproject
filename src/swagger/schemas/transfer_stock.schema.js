export const TransferStockSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            example: "transfer_001"
        },
        sender_branch_id: {
            type: "string",
            example: "branch_001"
        },
        receiver_branch_id: {
            type: "string",
            example: "branch_002"
        },
        products: {
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
                        example: 3
                    }
                },
                required: ["id", "quantity"]
            }
        },
        created_by: {
            type: "string",
            example: "user_001"
        }
    },
    required: ["sender_branch_id", "receiver_branch_id", "products", "created_by"]
};

export const TransferStockCreateRequestSchema = {
    type: "object",
    required: ["sender_branch_id", "receiver_branch_id", "products", "created_by"],
    properties: {
        sender_branch_id: {
            type: "string",
            example: "branch_001"
        },
        receiver_branch_id: {
            type: "string",
            example: "branch_002"
        },
        products: {
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
                        example: 3
                    }
                },
                required: ["id", "quantity"]
            }
        },
        created_by: {
            type: "string",
            example: "user_001"
        }
    }
};
