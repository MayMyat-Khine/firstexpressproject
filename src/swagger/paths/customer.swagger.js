export const customerPaths = {
    "/api/v1/customer": {
        post: {
            summary: "Create a customer",
            tags: ["Customers"],
            security: [],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/CustomerCreateRequest"
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Customer created successfully",
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
                                        $ref: "#/components/schemas/Customer"
                                    },
                                    token: {
                                        type: "string",
                                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
                                    },
                                    refresh_token: {
                                        type: "string",
                                        example: "refresh-token-value"
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
            summary: "Get all customers",
            tags: ["Customers"],
            responses: {
                200: {
                    description: "Customer list",
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
                                            $ref: "#/components/schemas/Customer"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        patch: {
            summary: "Update current customer",
            tags: ["Customers"],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            $ref: "#/components/schemas/CustomerCreateRequest"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Customer updated successfully",
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
                                        $ref: "#/components/schemas/Customer"
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
                }
            }
        }
    },
    "/api/v1/customer/{id}": {
        delete: {
            summary: "Delete a customer",
            tags: ["Customers"],
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
                    description: "Customer deleted successfully",
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
                                        example: "Sucessfully deleted customer"
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: "Customer not found"
                }
            }
        }
    }
};
