export const productPaths = {
    "/api/v1/product": {
        post: {
            summary: "Create a product",
            tags: ["Products"],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            $ref: "#/components/schemas/ProductCreateRequest"
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Product created successfully",
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
                                        $ref: "#/components/schemas/Product"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Validation error"
                },
                401: {
                    description: "Unauthorized"
                },
                403: {
                    description: "Forbidden"
                }
            }
        }
    },
    "/api/v1/products": {
        get: {
            summary: "Get all products",
            tags: ["Products"],
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
                        example: "tint"
                    }
                },
                {
                    name: "branchId",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string",
                        example: "64f11c2d9b2e4a5f1c0a1234"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Product list",
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
                                            $ref: "#/components/schemas/Product"
                                        }
                                    },
                                    total: {
                                        type: "integer",
                                        example: 20
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: "Unauthorized"
                },
                403: {
                    description: "Forbidden"
                }
            }
        }
    },
    "/api/v1/product/{id}": {
        get: {
            summary: "Get a product by ID",
            tags: ["Products"],
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
                    description: "Product details",
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
                                        $ref: "#/components/schemas/Product"
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: "Unauthorized"
                },
                403: {
                    description: "Forbidden"
                },
                404: {
                    description: "Product not found"
                }
            }
        },
        patch: {
            summary: "Update a product",
            tags: ["Products"],
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
                    "multipart/form-data": {
                        schema: {
                            $ref: "#/components/schemas/ProductUpdateRequest"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Product updated successfully",
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
                                        $ref: "#/components/schemas/Product"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Validation error"
                },
                401: {
                    description: "Unauthorized"
                },
                403: {
                    description: "Forbidden"
                }
            }
        },
        delete: {
            summary: "Delete a product",
            tags: ["Products"],
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
                    description: "Product deleted successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: {
                                        type: "boolean",
                                        example: true
                                    },
                                    message: {
                                        type: "string",
                                        example: "Successfully Deleted"
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: "Unauthorized"
                },
                403: {
                    description: "Forbidden"
                },
                404: {
                    description: "Product not found"
                }
            }
        }
    },
    "/api/v1/branch/{id}/products": {
        get: {
            summary: "Get products by branch",
            tags: ["Products"],
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
                    description: "Products for the requested branch",
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
                                            $ref: "#/components/schemas/Product"
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
                },
                401: {
                    description: "Unauthorized"
                },
                403: {
                    description: "Forbidden"
                },
                404: {
                    description: "Branch not found"
                }
            }
        }
    },
    "/api/v1/customer/branch/{bid}/product/{pid}": {
        get: {
            summary: "Get a product by branch and product ID for a customer",
            tags: ["Products"],
            parameters: [
                {
                    name: "bid",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "pid",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Product found for the selected branch",
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
                                        $ref: "#/components/schemas/Product"
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Product or branch not found"
                }
            }
        }
    },
    "/api/v1/customer/branch/{id}/products": {
        get: {
            summary: "Get products by branch for a customer",
            tags: ["Products"],
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
                    description: "Products list for the branch",
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
                                            $ref: "#/components/schemas/Product"
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
                },
                401: {
                    description: "Unauthorized"
                },
                404: {
                    description: "Branch not found"
                }
            }
        }
    }
};