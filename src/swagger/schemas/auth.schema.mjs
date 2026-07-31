export const CustomerLoginRequestSchema = {
    type: "object",
    required: ["phone_number", "password"],
    properties: {
        phone_number: {
            type: "string",
            example: "09123456789"
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
            example: "09123456789"
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
            example: "admin"
        },
        role: {
            type: "string",
            example: "admin"
        }
    }
};