import constant from "@app/lib/global-constant/constant";
import 'dotenv/config';
import {z} from "zod";


const configValidation = z.object({
    NODE_ENV: z.string(),

    PORT: z.string(),
    HOST: z.string(),

    PAYMENT_APP_PORT: z.string(),
    PAYMENT_APP_HOST: z.string(),

    SESSION_EXPIRE: z.string(),
    APP_SALT_ROUNDS: z.string(),

    DATABASE_MAIN_HOST: z.string(),
    DATABASE_MAIN_PORT: z.string(),
    DATABASE_MAIN_USERNAME: z.string(),
    DATABASE_MAIN_PASSWORD: z.string(),
    DATABASE_MAIN_DATABASE: z.string(),

    REDIS1_HOST: z.string(),
    REDIS1_PORT: z.string(),
    REDIS1_PASSWORD: z.string(),
    REDIS1_DB: z.string(),

    STRIPE_PUBLIC_KEY: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    PRICE_ID: z.string(),

    STRIPE_WEBHOOK_SECRET: z.string(),
});

// validate the config
export default configValidation.parse(process.env);
