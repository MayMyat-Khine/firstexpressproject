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
                },
                {
                    name: "categoryId",
                    in: "query",
                    required: false,
                    description: "Filter by category ID",
                    schema: {
                        type: "string",
                        example: "a1b2c3d4-5e6f-4a7b-8c9d-9e0f1a2b3c4d"
                    }
                },
                {
                    name: "brandId",
                    in: "query",
                    required: false,
                    description: "Filter by brand ID",
                    schema: {
                        type: "string",
                        example: "b2c3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e"
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
                                    pagination: {
                                        type: "object",
                                        properties: {
                                            page: {
                                                type: "integer",
                                                example: 1
                                            },
                                            limit: {
                                                type: "integer",
                                                example: 20
                                            },
                                            total: {
                                                type: "integer",
                                                example: 53
                                            }
                                        }
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
                },
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
                    name: "categoryId",
                    in: "query",
                    required: false,
                    description: "Filter by category ID",
                    schema: {
                        type: "string",
                        example: "a1b2c3d4-5e6f-4a7b-8c9d-9e0f1a2b3c4d"
                    }
                },
                {
                    name: "brandId",
                    in: "query",
                    required: false,
                    description: "Filter by brand ID",
                    schema: {
                        type: "string",
                        example: "b2c3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e"
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
                                    pagination: {
                                        type: "object",
                                        properties: {
                                            page: {
                                                type: "integer",
                                                example: 1
                                            },
                                            limit: {
                                                type: "integer",
                                                example: 20
                                            },
                                            total: {
                                                type: "integer",
                                                example: 53
                                            }
                                        }
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
                },
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
                    name: "categoryId",
                    in: "query",
                    required: false,
                    description: "Filter by category ID",
                    schema: {
                        type: "string",
                        example: "a1b2c3d4-5e6f-4a7b-8c9d-9e0f1a2b3c4d"
                    }
                },
                {
                    name: "brandId",
                    in: "query",
                    required: false,
                    description: "Filter by brand ID",
                    schema: {
                        type: "string",
                        example: "b2c3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e"
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
                                    pagination: {
                                        type: "object",
                                        properties: {
                                            page: {
                                                type: "integer",
                                                example: 1
                                            },
                                            limit: {
                                                type: "integer",
                                                example: 20
                                            },
                                            total: {
                                                type: "integer",
                                                example: 53
                                            }
                                        }
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