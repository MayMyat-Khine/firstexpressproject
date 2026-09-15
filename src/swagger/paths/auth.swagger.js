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
    },
    "/api/v1/verify-email": {
        post: {
            summary: "Send OTP to email",
            tags: ["Auth"],
            description: "Sends a 6-digit OTP to the provided email (expires in 5 minutes). Used for REGISTER or FORGOT_PASSWORD.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/SendOTPRequest"
                        }
                    }
                }
            },
            security: [],
            responses: {
                200: {
                    description: "OTP sent successfully",
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
                                        example: "Already send OTP to your mail, please check it."
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
    "/api/v1/verify-otp": {
        post: {
            summary: "Verify OTP",
            tags: ["Auth"],
            description: "Verifies the OTP for the given email and purpose. Marks OTP as verified if correct and not expired.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/VerifyOTPRequest"
                        }
                    }
                }
            },
            security: [],
            responses: {
                200: {
                    description: "OTP verified successfully",
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
                                        example: "OTP verified successfully"
                                    },
                                    verified: {
                                        type: "boolean",
                                        example: true
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Invalid or expired OTP"
                }
            }
        }
    }
};