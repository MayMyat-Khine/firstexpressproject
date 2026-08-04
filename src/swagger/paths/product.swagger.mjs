export const productPaths = {
    "/api/v1/product": {
        post: {
            summary: "Create a product",
            tags: ["Products"],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            $ref: "#/components/schemas/ProductCreateRequest"
                        },
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
                }
            }
        }
    },
    "/api/v1/products": {
        get: {
            summary: "Get all products",
            tags: ["Products"],
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
                }
            }
        }
    },
    "/api/v1/product/{id}": {
        get: {
            summary: "Get a product by ID",
            tags: ["Products"],
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
                404: {
                    description: "Product not found"
                }
            }
        },
        patch: {
            summary: "Update a product",
            tags: ["Products"],
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
                }
            }
        },
        delete: {
            summary: "Delete a product",
            tags: ["Products"],
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
                404: {
                    description: "Branch not found"
                }
            }
        }
    }
};