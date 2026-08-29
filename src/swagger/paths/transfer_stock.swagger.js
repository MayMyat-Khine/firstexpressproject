export const transferStockPaths = {
    "/api/v1/stock-transfer": {
        post: {
            summary: "Create a stock transfer",
            tags: ["Stock Transfer"],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/TransferStockCreateRequest"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Transfer created successfully",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/TransferStock"
                            }
                        }
                    }
                },
                400: {
                    description: "Validation error"
                }
            }
        },
        get: {
            summary: "Get stock transfer records",
            tags: ["Stock Transfer"],
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: "List of stock transfer records",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: {
                                        type: "boolean",
                                        example: true
                                    },
                                    body: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/TransferStock"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
