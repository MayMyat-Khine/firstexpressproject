export const PermissionSchema = {
    type: "object",
    properties: {
        _id: {
            type: "string",
            example: "64f11c2d9b2e4a5f1c0a1234"
        },
        code: {
            type: "string",
            example: "PRODUCT_VIEW"
        },
        name: {
            type: "string",
            example: "View Products"
        }
    },
    required: ["code", "name"]
};
