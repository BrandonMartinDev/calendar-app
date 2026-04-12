// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type CorsOptions
} from "cors";

import {
    type SessionOptions
} from "express-session";

import {
    getDomainFromOrigin,
    isOriginLocal
} from "@shared/utils/domain.utils.js";



// -- == [[ GENERAL ]] == -- \\

export const IS_PROD: boolean = ((process.env.VITE_IS_PROD as string) === "true") || true;
export const PORT: number = parseInt(process.env.PORT as string) || 8080;
export const BCRYPT_SALT_ROUNDS: number = 10;

export const PROD_BACKEND_URL: string = (process.env.VITE_PROD_BACKEND_URL as string);
export const PROD_FRONTEND_URL: string = (process.env.PROD_FRONTEND_URL as string);
export const TEST_BACKEND_URL: string = (process.env.VITE_TEST_BACKEND_URL as string) || "http://localhost:8080";
export const TEST_FRONTEND_URL: string = (process.env.TEST_FRONTEND_URL as string) || "http://localhost:5173";



// -- == [[ CORS ]] == -- \\

export const CORS_WHITELIST = [PROD_BACKEND_URL, PROD_FRONTEND_URL, TEST_BACKEND_URL, TEST_FRONTEND_URL];

export const CORS_OPTIONS: CorsOptions = {

    credentials: true,
    origin: (reqOrigin, callback) => {

        // Get err message and check if origin exists

        const errMessage = `Not allowed by CORS: '${reqOrigin}'\n\nAllowed Origins Below:\n\n-----\n${CORS_WHITELIST.join("\n")}\n-----\n\n`

        if (!reqOrigin) {
            return callback(null, true);
        }


        // Check if origin is local

        const isLocal = isOriginLocal(reqOrigin);

        if (isLocal) {
            return callback(null, true);
        };


        // Get domain from origin and loop through cors whitelist

        const domain = getDomainFromOrigin(reqOrigin);

        for (let i = 0; i < CORS_WHITELIST.length; i++) {

            // get domain from current cors whitelist index

            const whiteListedDomain = getDomainFromOrigin(CORS_WHITELIST[i]);


            // Check if whitelisted domain is the same as origin's domain

            if (whiteListedDomain === domain) {
                return callback(null, true);
            }

        }

        // Catch all rejection

        console.warn("BLOCKED DOMAIN:", reqOrigin);

        callback(new Error(errMessage));

    },

}



// -- == [[ MONGO ]] == -- \\

export const MONGO_USERNAME: string = process.env.MONGO_USERNAME as string;
export const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD as string;

export const MONGO_CONNECTION_STRING: string = (process.env.MONGO_CONNECTION_STRING as string)
    .replace("<username>", MONGO_USERNAME)
    .replace("<password>", MONGO_PASSWORD);



// -- == [[ EXPRESS SESSION ]] == -- \\

export const COOKIE_SECRET: string = (process.env.COOKIE_SECRET as string);

export const EXPRESS_SESSION_OPTIONS: SessionOptions = {

    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
        sameSite: IS_PROD,
        maxAge: (1000 * 60 * 60 * 24 * 30) // 30 Days = 1000ms * 60s * 60m * 24h * 30d
    }

}