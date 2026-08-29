export const CustomerLoginRequestSchema = {
    type: "object",
    required: ["region", "phone_number", "password"],
    properties: {
        region: {
            type: "string",
            description: "Country ObjectId (dial code is resolved from this region)",
            example: "64f11c2d9b2e4a5f1c0a1234"
        },
        phone_number: {
            type: "string",
            description: "Phone number without dial code (dial code is prepended from region)",
            example: "912345678"
        },
        password: {
            type: "string",
            example: "secret123"
        }
    }
};

export const UserLoginRequestSchema = {
    type: "object",
    required: ["name", "password"],
    properties: {
        name: {
            type: "string",
            example: "admin"
        },
        password: {
            type: "string",
            example: "secret123"
        }
    }
};

export const RefreshTokenRequestSchema = {
    type: "object",
    required: ["refresh_token"],
    properties: {
        refresh_token: {
            type: "string",
            example: "refresh-token-value"
        }
    }
};

export const CustomerAuthResponseSchema = {
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
        phone_number: {
            type: "string",
            description: "Full phone with dial code (dialCode + phone_number)",
            example: "+95912345678"
        },
        image: {
            type: "string",
            nullable: true,
            example: "https://res.cloudinary.com/demo/image/upload/retail/customers/avatar.jpg"
        }
    }
};

export const UserAuthResponseSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            example: "user_001"
        },
        name: {
            type: "string",
            description: "Unique login name (no spaces)",
            example: "admin"
        },
        display_name: {
            type: "string",
            example: "Admin User"
        },
        role: {
            type: "string",
            description: "Role ID (ref: role)",
            example: "64f11c2d9b2e4a5f1c0a1234"
        }
    }
};