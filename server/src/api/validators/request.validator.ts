// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type Request,
    type Response,
    type NextFunction
} from "express";


// Utils

import HandleError from "@utils/handleError.util.js";
import SendResponse from "@utils/sendResponse.util.js";



// -- == [[ METHODS ]] == -- \\

const ValidateRequestBodyExists = (req: Request, res: Response, next: NextFunction) => {

    /*
        Makes sure request body exists on request
    */

    try {

        if (!req.body) {

            SendResponse(res, {
                statusCode: 400,
                responseJson: {
                    error: "Invalid request"
                }
            });

            return;

        }

        console.log("[VALIDATE] Validated request body exists");

        next();

    } catch (error) {
        HandleError(res, { error: error });
    }

}



// -- == [[ EXPORTS ]] == -- \\

export {
    ValidateRequestBodyExists
}