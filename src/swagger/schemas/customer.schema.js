export const CustomerSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            example: "cust_001"
        },
        name: {
            type: "string",
            example: "John Doe"
        },
        region: {
            type: "string",
            format: "objectId",
            description: "MongoDB ID of the customer's country/region",
            example: "64f5c2b9e8a1d2c3b4a5f678"
        },
        email: {
            type: "string",
            format: "email",
            example: "john@example.com"
        },
        phone_number: {
            type: "string",
            example: "09123456789"
        },
        password: {
            type: "string",
            example: "secret123"
        },
        isEmailVerified: {
            type: "boolean",
            example: false
        },
        purpose: {
            type: "string"
        }
    },
    required: ["id", "name", "region", "email", "phone_number", "password", "purpose"]
};

export const CustomerCreateRequestSchema = {
    type: "object",
    required: ["name", "region", "email", "phone_number", "password", "otp", "purpose"],
    properties: {
        name: {
            type: "string",
            example: "John Doe"
        },
        region: {
            type: "string",
            format: "objectId",
            description: "MongoDB ID of the customer's country/region",
            example: "64f5c2b9e8a1d2c3b4a5f678"
        },
        email: {
            type: "string",
            format: "email",
            example: "john@example.com"
        },
        phone_number: {
            type: "string",
            example: "09123456789"
        },
        password: {
            type: "string",
            example: "secret123"
        },
        otp: {
            type: "string",
            description: "6-digit OTP verified via /verify-otp",
            example: "123456"
        },
        purpose: {
            type: "string",
            enum: ["REGISTER", "FORGOT_PASSWORD"],
            example: "REGISTER"
        }
    }
};
