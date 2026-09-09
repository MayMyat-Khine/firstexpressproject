export const brandPaths = {
    "/api/v1/brand": {
        post: {
            summary: "Create a brand",
            tags: ["Brands"],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/BrandCreateRequest" }
                    }
                }
            },
            responses: {
                201: { description: "Brand created successfully", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean", example: true }, body: { $ref: "#/components/schemas/Brand" } } } } } },
                400: { description: "Validation error" },
                401: { description: "Unauthorized" },
                403: { description: "Forbidden" }
            }
        }
    },
    "/api/v1/brands": {
        get: {
            summary: "Get all brands",
            tags: ["Brands"],
            parameters: [
                { name: "page", in: "query", required: false, schema: { type: "integer", example: 1 } },
                { name: "limit", in: "query", required: false, schema: { type: "integer", example: 20 } },
                { name: "search", in: "query", required: false, schema: { type: "string", example: "Coca" } }
            ],
            responses: {
                200: {
                    description: "Brand list",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: { type: "boolean", example: true },
                                    body: { type: "array", items: { $ref: "#/components/schemas/Brand" } },
                                    pagination: { type: "object", properties: { page: { type: "integer", example: 1 }, limit: { type: "integer", example: 20 }, total: { type: "integer", example: 53 } } }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/v1/brand/{id}": {
        get: {
            summary: "Get brand by ID",
            tags: ["Brands"],
            security: [{ bearerAuth: [] }],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            responses: {
                200: { description: "Brand details", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean", example: true }, body: { $ref: "#/components/schemas/Brand" } } } } } },
                404: { description: "Brand not found" }
            }
        },
        patch: {
            summary: "Update a brand",
            tags: ["Brands"],
            security: [{ bearerAuth: [] }],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/BrandUpdateRequest" } } } },
            responses: {
                200: { description: "Brand updated successfully", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean", example: true }, body: { $ref: "#/components/schemas/Brand" } } } } } },
                400: { description: "Validation error" },
                404: { description: "Brand not found" }
            }
        },
        delete: {
            summary: "Delete a brand",
            tags: ["Brands"],
            security: [{ bearerAuth: [] }],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            responses: {
                200: { description: "Brand deleted successfully", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean", example: true }, message: { type: "string", example: "Brand deleted successfully" } } } } } },
                404: { description: "Brand not found" }
            }
        }
    }
};
