export const permissionPaths = {
    "/api/permissions": {
        get: {
            summary: "Get all permissions",
            tags: ["Permissions"],
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: "List of permissions",
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
                                            $ref: "#/components/schemas/Permission"
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
    "/api/permission": {
        post: {
            summary: "Seed permissions",
            tags: ["Permissions"],
            responses: {
                200: {
                    description: "Permissions seeded successfully",
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
                                        example: "Successfully Created Permission"
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
