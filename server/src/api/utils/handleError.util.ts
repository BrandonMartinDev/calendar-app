// -- == [[ IMPORTS ]] == -- \\

// Types

import { type Response } from 'express';


// Utils

import SendResponse from '@utils/sendResponse.util';


// -- == [[ TYPES ]] == -- \\

type ErrorOptions = {

    error: unknown;

    statusCode?: number;
    responseMessage?: string;

}


// -- == [[ METHODS ]] == -- \\

const HandleError = (res: (Response | undefined), errorOptions: ErrorOptions) => {

    try {

        // Get error options from errorOptions object

        const { error, statusCode, responseMessage } = errorOptions;


        // Checks if error is a "Error" object
        // If so, console warns message property on Error object
        // Else, just console warns the error

        if (error instanceof Error) {
            console.warn(error.message);
        } else {
            console.warn(error);
        }


        // If res was not provided, then stop function here

        if (res === undefined) return;



        // If res was provided, respond to the client using provided/default values

        SendResponse(res, {

            statusCode: statusCode || 500,

            responseJson: {
                error: responseMessage || "Something went wrong."
            }

        });

    } catch (error) {
        console.error("CRITICAL ERROR, RESOLVE IMMEDIATELY", error);
    }

}



// -- == [[ EXPORTS ]] == -- \\

export default HandleError;