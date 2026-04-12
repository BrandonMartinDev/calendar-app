// -- == [[ GENERAL ]] == -- \\

export const IS_PROD: boolean = (import.meta.env.VITE_IS_PROD as string) === "false" ? false : true;

export const PROD_BACKEND_URL: string = (import.meta.env.VITE_PROD_BACKEND_URL as string);
export const TEST_BACKEND_URL: string = (import.meta.env.VITE_TEST_BACKEND_URL as string) || "http://localhost:8080";