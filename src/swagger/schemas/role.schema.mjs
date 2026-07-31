export const RoleSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            example: "Admin"
        },
        permissions: {
            type: "array",
            items: {
                type: "string",
                example: "64f11c2d9b2e4a5f1c0a1234"
            },
            example: ["64f11c2d9b2e4a5f1c0a1234"]
        }
    },
    required: ["name", "permissions"]
};

export const RoleCreateRequestSchema = {
    type: "object",
    required: ["name", "permissions"],
    properties: {
        name: {
            type: "string",
            example: "Admin"
        },
        permissions: {
            type: "array",
            items: {
                type: "string",
                example: "64f11c2d9b2e4a5f1c0a1234"
            },
            example: ["64f11c2d9b2e4a5f1c0a1234"]
        }
    }
};

export const RoleUpdateRequestSchema = {
    type: "object",
    properties: {
        permissions: {
            type: "array",
            items: {
                type: "string",
                example: "64f11c2d9b2e4a5f1c0a1234"
            },
            example: ["64f11c2d9b2e4a5f1c0a1234"]
        }
    }
};
