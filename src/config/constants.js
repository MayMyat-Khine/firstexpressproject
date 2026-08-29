import { v4 as uuidv4, v5 as uuidv5 } from "uuid";

// let PRODUCT_NAMESPACE_UUID4 = null;

// export const PRODUCT_NAMESPACE = () => {
//     if (PRODUCT_NAMESPACE_UUID4 === null) {
//         PRODUCT_NAMESPACE_UUID4 = uuidv4();
//     }
//     return PRODUCT_NAMESPACE_UUID4;
// };
export const PRODUCT_NAMESPACE = "bfa1e6a0-2bda-4f3a-9a9c-1b57f4a3a999";

export const STOCK_NAMESPACE =
    "c1f9c8e2-4b67-4c4a-9c12-83fd6f3a1123";

export const STOCK_TRANSFER_NAMESPACE =
    "e7f6a1c2-9bfa-4d3a-bd0d-3e9f6a5b2c1d";

export const countries =
    [
        { name: "Myanmar", code: "MM", dialCode: "+95", currencyCode: "MMK" },
        { name: "Thailand", code: "TH", dialCode: "+66", currencyCode: "THB" },
        { name: "Singapore", code: "SG", dialCode: "+65", currencyCode: "SGD" },
        { name: "Malaysia", code: "MY", dialCode: "+60", currencyCode: "MYR" },
        { name: "Indonesia", code: "ID", dialCode: "+62", currencyCode: "IDR" },
        { name: "Vietnam", code: "VN", dialCode: "+84", currencyCode: "VND" },
        { name: "Philippines", code: "PH", dialCode: "+63", currencyCode: "PHP" },
        { name: "Cambodia", code: "KH", dialCode: "+855", currencyCode: "KHR" },
        { name: "Laos", code: "LA", dialCode: "+856", currencyCode: "LAK" },
        { name: "Bangladesh", code: "BD", dialCode: "+880", currencyCode: "BDT" },

        { name: "India", code: "IN", dialCode: "+91", currencyCode: "INR" },
        { name: "China", code: "CN", dialCode: "+86", currencyCode: "CNY" },
        { name: "Japan", code: "JP", dialCode: "+81", currencyCode: "JPY" },
        { name: "South Korea", code: "KR", dialCode: "+82", currencyCode: "KRW" },
        { name: "Taiwan", code: "TW", dialCode: "+886", currencyCode: "TWD" },
        { name: "Hong Kong", code: "HK", dialCode: "+852", currencyCode: "HKD" },
        { name: "Australia", code: "AU", dialCode: "+61", currencyCode: "AUD" },
        { name: "New Zealand", code: "NZ", dialCode: "+64", currencyCode: "NZD" },

        { name: "United States", code: "US", dialCode: "+1", currencyCode: "USD" },
        { name: "Canada", code: "CA", dialCode: "+1", currencyCode: "CAD" },
        { name: "United Kingdom", code: "GB", dialCode: "+44", currencyCode: "GBP" },
        { name: "Ireland", code: "IE", dialCode: "+353", currencyCode: "EUR" },
        { name: "France", code: "FR", dialCode: "+33", currencyCode: "EUR" },
        { name: "Germany", code: "DE", dialCode: "+49", currencyCode: "EUR" },
        { name: "Italy", code: "IT", dialCode: "+39", currencyCode: "EUR" },
        { name: "Spain", code: "ES", dialCode: "+34", currencyCode: "EUR" },
        { name: "Portugal", code: "PT", dialCode: "+351", currencyCode: "EUR" },
        { name: "Netherlands", code: "NL", dialCode: "+31", currencyCode: "EUR" },
        { name: "Belgium", code: "BE", dialCode: "+32", currencyCode: "EUR" },
        { name: "Switzerland", code: "CH", dialCode: "+41", currencyCode: "CHF" },

        { name: "Norway", code: "NO", dialCode: "+47", currencyCode: "NOK" },
        { name: "Denmark", code: "DK", dialCode: "+45", currencyCode: "DKK" },
        { name: "Finland", code: "FI", dialCode: "+358", currencyCode: "EUR" },
        { name: "Poland", code: "PL", dialCode: "+48", currencyCode: "PLN" },
        { name: "Austria", code: "AT", dialCode: "+43", currencyCode: "EUR" },

        { name: "Greece", code: "GR", dialCode: "+30", currencyCode: "EUR" },
        { name: "Russia", code: "RU", dialCode: "+7", currencyCode: "RUB" },
        { name: "Ukraine", code: "UA", dialCode: "+380", currencyCode: "UAH" },
        { name: "Turkey", code: "TR", dialCode: "+90", currencyCode: "TRY" },

        { name: "United Arab Emirates", code: "AE", dialCode: "+971", currencyCode: "AED" },
        { name: "Saudi Arabia", code: "SA", dialCode: "+966", currencyCode: "SAR" },
        { name: "Qatar", code: "QA", dialCode: "+974", currencyCode: "QAR" },

        { name: "Israel", code: "IL", dialCode: "+972", currencyCode: "ILS" },
        { name: "Egypt", code: "EG", dialCode: "+20", currencyCode: "EGP" },
        { name: "South Africa", code: "ZA", dialCode: "+27", currencyCode: "ZAR" },
        { name: "Nigeria", code: "NG", dialCode: "+234", currencyCode: "NGN" },
    ]

export const currencyRates = [
    { code: "USD", rate: 1.0 },

    // Southeast Asia
    { code: "MMK", rate: 2100.0 },
    { code: "THB", rate: 32.5 },
    { code: "SGD", rate: 1.29 },
    { code: "MYR", rate: 4.24 },
    { code: "IDR", rate: 16400.0 },
    { code: "VND", rate: 26250.0 },
    { code: "PHP", rate: 56.7 },
    { code: "KHR", rate: 4050.0 },
    { code: "LAK", rate: 21750.0 },
    { code: "BDT", rate: 122.0 },

    // Asia
    { code: "INR", rate: 87.7 },
    { code: "CNY", rate: 7.17 },
    { code: "JPY", rate: 147.0 },
    { code: "KRW", rate: 1395.0 },
    { code: "TWD", rate: 30.0 },
    { code: "HKD", rate: 7.85 },

    // Oceania
    { code: "AUD", rate: 1.53 },
    { code: "NZD", rate: 1.67 },

    // North America
    { code: "CAD", rate: 1.37 },

    // Europe
    { code: "GBP", rate: 0.74 },
    { code: "EUR", rate: 0.86 },
    { code: "CHF", rate: 0.80 },
    { code: "NOK", rate: 10.1 },
    { code: "DKK", rate: 6.45 },
    { code: "PLN", rate: 3.65 },
    { code: "RUB", rate: 79.5 },
    { code: "UAH", rate: 41.4 },
    { code: "TRY", rate: 44.1 },

    // Middle East
    { code: "AED", rate: 3.67 },
    { code: "SAR", rate: 3.75 },
    { code: "QAR", rate: 3.64 },
    { code: "ILS", rate: 3.39 },
    { code: "EGP", rate: 48.7 },

    // Africa
    { code: "ZAR", rate: 17.7 },
    { code: "NGN", rate: 1545.0 },
];