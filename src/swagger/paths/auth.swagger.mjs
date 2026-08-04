export const authPaths = {
    "/api/v1/loginCustomer": {
        post: {
            summary: "Login customer",
            tags: ["Auth"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/CustomerLoginRequest"
                        }
                    }
                }
            },
            security: [],
            responses: {
                200: {
                    description: "Customer authenticated successfully",
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
                                        $ref: "#/components/schemas/CustomerAuthResponse"
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
    },
    "/api/v1/loginUser": {
        post: {
            summary: "Login user",
            tags: ["Auth"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/UserLoginRequest"
                        }
                    }
                }
            },
            security: [],
            responses: {
                200: {
                    description: "User authenticated successfully",
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
                                        $ref: "#/components/schemas/UserAuthResponse"
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
    },
    "/api/v1/refreshToken": {
        post: {
            summary: "Refresh access token",
            tags: ["Auth"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/RefreshTokenRequest"
                        }
                    }
                }
            },
            security: [],
            responses: {
                200: {
                    description: "Access token refreshed successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: {
                                        type: "boolean",
                                        example: true
                                    },
                                    access_token: {
                                        type: "string",
                                        example: "new-access-token"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Invalid refresh token"
                }
            }
        }
    }
};