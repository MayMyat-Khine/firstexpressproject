import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();


const envSchema = z.object({

    NODE_ENV: z
        .enum([
            "development",
            "production",
            "test"
        ])
        .default("development"),


    PORT: z
        .string()
        .default("3000"),


    MONGO_URI: z
        .string({
            required_error: "MONGO_URI is required"
        })
        .min(1, "MONGO_URI cannot be empty"),


    // JWT_SECRET: z
    //     .string({
    //         required_error: "JWT_SECRET is required"
    //     })
    //     .min(32, "JWT_SECRET must be at least 32 characters"),


    ACCESS_TOKEN_SECRET: z
        .string({
            required_error: "ACCESS_TOKEN_SECRET is required"
        })
        .min(32),


    REFRESH_TOKEN_SECRET: z
        .string({
            required_error: "REFRESH_TOKEN_SECRET is required"
        })
        .min(32),

    ACCESS_TOKEN_EXPIRES: z.string(),
    REFRESH_TOKEN_EXPIRES: z.string()

});


// Validate environment
const parsedEnv = envSchema.safeParse(process.env);


if (!parsedEnv.success) {

    console.error(
        "❌ Invalid environment variables"
    );


    console.error(
        parsedEnv.error.flatten().fieldErrors
    );


    process.exit(1);
}


export const env = parsedEnv.data;