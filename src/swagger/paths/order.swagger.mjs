export const orderPaths = {
    "/api/order": {
        post: {
            summary: "Create an order",
            tags: ["Orders"],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/OrderCreateRequest"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Order created successfully",
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
                                        $ref: "#/components/schemas/Order"
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
    "/api/orders/me": {
        get: {
            summary: "Get my orders",
            tags: ["Orders"],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "page",
                    in: "query",
                    required: false,
                    schema: {
                        type: "integer",
                        example: 1
                    }
                },
                {
                    name: "limit",
                    in: "query",
                    required: false,
                    schema: {
                        type: "integer",
                        example: 20
                    }
                },
                {
                    name: "search",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string",
                        example: ""
                    }
                }
            ],
            responses: {
                200: {
                    description: "List of my orders",
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
                                            $ref: "#/components/schemas/Order"
                                        }
                                    },
                                    total: {
                                        type: "integer",
                                        example: 5
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/orders": {
        get: {
            summary: "Get all orders",
            tags: ["Orders"],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "page",
                    in: "query",
                    required: false,
                    schema: {
                        type: "integer",
                        example: 1
                    }
                },
                {
                    name: "limit",
                    in: "query",
                    required: false,
                    schema: {
                        type: "integer",
                        example: 20
                    }
                },
                {
                    name: "search",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string",
                        example: ""
                    }
                }
            ],
            responses: {
                200: {
                    description: "List of orders",
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
                                            $ref: "#/components/schemas/Order"
                                        }
                                    },
                                    total: {
                                        type: "integer",
                                        example: 10
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/order/me/{id}": {
        get: {
            summary: "Get my order by ID",
            tags: ["Orders"],
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
            responses: {
                200: {
                    description: "Order details",
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
                                        $ref: "#/components/schemas/Order"
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Order not found"
                }
            }
        }
    },
    "/api/order/{id}": {
        get: {
            summary: "Get order by ID",
            tags: ["Orders"],
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
            responses: {
                200: {
                    description: "Order details",
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
                                        $ref: "#/components/schemas/Order"
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Order not found"
                }
            }
        },
        put: {
            summary: "Update an order",
            tags: ["Orders"],
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
                            $ref: "#/components/schemas/OrderUpdateRequest"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Order updated successfully",
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
                                        $ref: "#/components/schemas/Order"
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
    "/api/branch/{id}/orders": {
        get: {
            summary: "Get orders by branch",
            tags: ["Orders"],
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
            responses: {
                200: {
                    description: "Orders for the requested branch",
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
                                            $ref: "#/components/schemas/Order"
                                        }
                                    },
                                    count: {
                                        type: "integer",
                                        example: 3
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
