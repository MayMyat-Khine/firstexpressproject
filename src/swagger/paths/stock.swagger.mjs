export const stockPaths = {
    "/api/v1/stock/{id}": {
        patch: {
            summary: "Update stock",
            tags: ["Stocks"],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/StockUpdateRequest"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Stock updated successfully",
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
                                        $ref: "#/components/schemas/Stock"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Validation error"
                }
            }
        }
    }
};
