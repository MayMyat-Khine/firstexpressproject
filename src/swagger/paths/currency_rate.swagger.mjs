export const currencyRatePaths = {
    "/api/v1/currencyRate": {
        post: {
            summary: "Create currency rates",
            tags: ["Currency Rates"],
            responses: {
                201: {
                    description: "Currency rates created successfully",
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
                                            $ref: "#/components/schemas/CurrencyRate"
                                        }
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
    },
    "/api/v1/currencyRates": {
        get: {
            summary: "Get all currency rates",
            tags: ["Currency Rates"],
            responses: {
                200: {
                    description: "List of currency rates",
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
                                            $ref: "#/components/schemas/CurrencyRate"
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
