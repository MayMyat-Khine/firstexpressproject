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
        display_name: {
            type: "string",
            example: "John"
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
    required: ["id", "name", "display_name", "phone_number", "password"]
};

export const CustomerCreateRequestSchema = {
    type: "object",
    required: ["name", "display_name", "phone_number", "password"],
    properties: {
        name: {
            type: "string",
            example: "John Doe"
        },
        display_name: {
            type: "string",
            example: "John"
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
