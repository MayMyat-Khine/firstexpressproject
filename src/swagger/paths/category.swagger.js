export const categoryPaths = {
    "/api/v1/category": {
        post: {
            summary: "Create a category",
            tags: ["Categories"],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/CategoryCreateRequest" }
                    }
                }
            },
            responses: {
                201: { description: "Category created successfully", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean", example: true }, body: { $ref: "#/components/schemas/Category" } } } } } },
                400: { description: "Validation error" },
                401: { description: "Unauthorized" },
                403: { description: "Forbidden" }
            }
        }
    },
    "/api/v1/categories": {
        get: {
            summary: "Get all categories",
            tags: ["Categories"],
            parameters: [
                { name: "page", in: "query", required: false, schema: { type: "integer", example: 1 } },
                { name: "limit", in: "query", required: false, schema: { type: "integer", example: 20 } },
                { name: "search", in: "query", required: false, schema: { type: "string", example: "Beverages" } }
            ],
            responses: {
                200: {
                    description: "Category list",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: { type: "boolean", example: true },
                                    body: { type: "array", items: { $ref: "#/components/schemas/Category" } },
                                    pagination: { type: "object", properties: { page: { type: "integer", example: 1 }, limit: { type: "integer", example: 20 }, total: { type: "integer", example: 53 } } }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/v1/category/{id}": {
        get: {
            summary: "Get category by ID",
            tags: ["Categories"],
            security: [{ bearerAuth: [] }],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            responses: {
                200: { description: "Category details", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean", example: true }, body: { $ref: "#/components/schemas/Category" } } } } } },
                404: { description: "Category not found" }
            }
        },
        patch: {
            summary: "Update a category",
            tags: ["Categories"],
            security: [{ bearerAuth: [] }],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CategoryUpdateRequest" } } } },
            responses: {
                200: { description: "Category updated successfully", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean", example: true }, body: { $ref: "#/components/schemas/Category" } } } } } },
                400: { description: "Validation error" },
                404: { description: "Category not found" }
            }
        },
        delete: {
            summary: "Delete a category",
            tags: ["Categories"],
            security: [{ bearerAuth: [] }],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            responses: {
                200: { description: "Category deleted successfully", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean", example: true }, message: { type: "string", example: "Category deleted successfully" } } } } } },
                404: { description: "Category not found" }
            }
        }
    }
};
