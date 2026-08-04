export const rolePaths = {
    "/api/v1/role": {
        post: {
            summary: "Create a role",
            tags: ["Roles"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/RoleCreateRequest"
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Role created successfully",
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
                                        $ref: "#/components/schemas/Role"
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
    "/api/v1/role/{id}": {
        patch: {
            summary: "Update a role",
            tags: ["Roles"],
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
                            $ref: "#/components/schemas/RoleUpdateRequest"
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Role updated successfully",
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
                                        $ref: "#/components/schemas/Role"
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
