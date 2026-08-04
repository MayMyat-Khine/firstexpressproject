export const branchPaths = {
    "/api/v1/branch": {
        post: {
            summary: "Create a branch",
            tags: ["Branches"],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/BranchCreateRequest"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Branch created successfully",
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
                                        $ref: "#/components/schemas/Branch"
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
    "/api/v1/branches": {
        get: {
            summary: "Get all branches",
            tags: ["Branches"],
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: "List of branches",
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
                                            $ref: "#/components/schemas/Branch"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/v1/branch/{id}": {
        get: {
            summary: "Get branch by ID",
            tags: ["Branches"],
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
                    description: "Branch details",
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
                                        $ref: "#/components/schemas/Branch"
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
        },
        patch: {
            summary: "Update a branch",
            tags: ["Branches"],
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
                            $ref: "#/components/schemas/BranchUpdateRequest"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Branch updated successfully",
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
                                        $ref: "#/components/schemas/Branch"
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
            summary: "Delete a branch",
            tags: ["Branches"],
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
                    description: "Branch deleted successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: {
                                        type: "boolean",
                                        example: false
                                    },
                                    message: {
                                        type: "string",
                                        example: "Branch with id 123 is successfully deleted with all data"
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
