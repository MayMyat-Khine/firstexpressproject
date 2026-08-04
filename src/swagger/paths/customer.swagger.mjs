export const customerPaths = {
    "/api/v1/customer": {
        post: {
            summary: "Create a customer",
            tags: ["Customers"],
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
        }
    }
};
