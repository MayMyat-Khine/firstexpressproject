export const StockSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            example: "stock_001"
        },
        product_id: {
            type: "string",
            example: "product_001"
        },
        branch_id: {
            type: "string",
            example: "branch_001"
        },
        stock: {
            type: "number",
            example: 20
        },
        low_stock: {
            type: "number",
            example: 5
        }
    },
    required: ["id", "product_id", "branch_id", "stock", "low_stock"]
};

export const StockUpdateRequestSchema = {
    type: "object",
    properties: {
        stock: {
            type: "number",
            example: 25
        },
        low_stock: {
            type: "number",
            example: 6
        }
    }
};
