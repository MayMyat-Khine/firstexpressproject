export const UserSchema = {
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
        display_name: {
            type: "string",
            example: "Admin"
        },
        password: {
            type: "string",
            example: "secret123"
        },
        role: {
            type: "string",
            example: "admin"
        }
    },
    required: ["id", "name", "display_name", "password"]
};

export const UserCreateRequestSchema = {
    type: "object",
    required: ["name", "display_name", "password", "role"],
    properties: {
        id: {
            type: "string",
            example: "user_001"
        },
        name: {
            type: "string",
            example: "admin"
        },
        display_name: {
            type: "string",
            example: "Admin"
        },
        password: {
            type: "string",
            example: "secret123"
        },
        role: {
            type: "string",
            example: "admin"
        }
    }
};

export const UserUpdateRequestSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            example: "updated_admin"
        },
        display_name: {
            type: "string",
            example: "Updated Admin"
        },
        password: {
            type: "string",
            example: "newsecret123"
        },
        role: {
            type: "string",
            example: "manager"
        }
    }
};
