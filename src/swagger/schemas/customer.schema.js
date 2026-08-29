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
        phone_number: {
            type: "string",
            example: "09123456789"
        },
        password: {
            type: "string",
            example: "secret123"
        }
    },
    required: ["id", "name", "region", "phone_number", "password"]
};

export const CustomerCreateRequestSchema = {
    type: "object",
    required: ["name", "region", "phone_number", "password"],
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
