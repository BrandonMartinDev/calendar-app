// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type CorsOptions
} from "cors";

import {
    type SessionOptions
} from "express-session";


// Shared

import {
    BACKEND_URL,
    FRONTEND_URL
} from "@shared/config/settings.config";



// -- == [[ GENERAL ]] == -- \\

export const PORT: number = parseInt(process.env.PORT as string) || 3000;
export const BCRYPT_SALT_ROUNDS: number = 10;



// -- == [[ CORS ]] == -- \\

export const CORS_WHITELIST = [BACKEND_URL, FRONTEND_URL, "http://localhost:5173"];

export const CORS_OPTIONS: CorsOptions = {

    credentials: true,
    origin: (reqOrigin, callback) => {

        if (!reqOrigin || CORS_WHITELIST.indexOf(reqOrigin) !== -1) {
            callback(null, true)
        } else {
            const message = `Not allowed by CORS: '${reqOrigin}'\n\nAllowed Resources Below:\n\n-----\n${CORS_WHITELIST.join("\n")}\n-----\n\n`
            callback(new Error(message))
        }

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
        maxAge: (1000 * 60 * 60 * 24 * 30) // 30 Days = 1000ms * 60s * 60m * 24h * 30d
    }

}