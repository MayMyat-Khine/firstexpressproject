export const cartPaths = {
    "/api/v1/cart": {
        post: {
            summary: "Create a cart",
            tags: ["Carts"],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/CartCreateRequest"
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Cart created successfully",
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
                                        $ref: "#/components/schemas/Cart"
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
        },
        get: {
            summary: "Get current customer cart",
            tags: ["Carts"],
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: "Cart fetched successfully",
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
                                        $ref: "#/components/schemas/Cart"
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Cart not found"
                }
            }
        }
    }
};
