export const countryPaths = {
    "/api/v1/country": {
        post: {
            summary: "Create a country",
            tags: ["Countries"],
            responses: {
                201: {
                    description: "Countries created successfully",
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
                                            $ref: "#/components/schemas/Country"
                                        }
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
    "/api/v1/countries": {
        get: {
            summary: "Get all countries",
            tags: ["Countries"],
            responses: {
                200: {
                    description: "List of countries",
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
                                            $ref: "#/components/schemas/Country"
                                        }
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
