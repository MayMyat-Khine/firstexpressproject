export const BranchSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            example: "branch_001"
        },
        name: {
            type: "string",
            example: "Main Branch"
        },
        address: {
            type: "string",
            example: "Yangon"
        },
        contact: {
            type: "string",
            example: "09-123456789"
        }
    },
    required: ["id", "name", "address"]
};

export const BranchCreateRequestSchema = {
    type: "object",
    required: ["id", "name", "address"],
    properties: {
        id: {
            type: "string",
            example: "branch_001"
        },
        name: {
            type: "string",
            example: "Main Branch"
        },
        address: {
            type: "string",
            example: "Yangon"
        },
        contact: {
            type: "string",
            example: "09-123456789"
        }
    }
};

export const BranchUpdateRequestSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            example: "Updated Branch"
        },
        address: {
            type: "string",
            example: "Mandalay"
        },
        contact: {
            type: "string",
            example: "09-987654321"
        }
    }
};
