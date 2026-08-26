export const CurrencyRateSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            description: "Currency rate ID"
        },
        code: {
            type: "string",
            description: "ISO 4217 currency code",
            example: "MMK"
        },
        rate: {
            type: "number",
            example: 2100
        }
    },
    required: ["id", "code", "rate"]
};
