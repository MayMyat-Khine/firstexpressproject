export const CountrySchema = {
    type: "object",
    properties: {

        name: {
            type: "string",
            example: "Myanmar"
        },
        code: {
            type: "string",
            example: "MM"
        },
        dialCode: {
            type: "string",
            example: "+95"
        },
        currencyCode: {
            type: "string",
            description: "ISO 4217 currency code",
            example: "MMK"
        }
    },
    required: ["name", "code", "dialCode", "currencyCode"]
};

export const CountryCreateRequestSchema = {
    type: "object",
    required: ["name", "code", "dialCode", "currencyCode"],
    properties: {

        name: {
            type: "string",
            example: "Myanmar"
        },
        code: {
            type: "string",
            example: "MM"
        },
        dialCode: {
            type: "string",
            example: "+95"
        },
        currencyCode: {
            type: "string",
            description: "ISO 4217 currency code",
            example: "MMK"
        }
    }
};
