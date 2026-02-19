// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type Request,
    type Response,
    type NextFunction
} from "express";


// Utils

import HandleError from "@utils/handleError.util";
import SendResponse from "@utils/sendResponse.util";



// -- == [[ METHODS ]] == -- \\

const ValidateUserIsLoggedIn = (req: Request, res: Response, next: NextFunction) => {

    /*
        Makes sure user is logged in.
        If user is logged out, will send error response
    */

    try {

        const loggedInUserID = req.session.loggedInUserID;

        if (loggedInUserID === undefined) {

            SendResponse(res, {
                statusCode: 401,
                responseJson: {
                    error: "User is NOT logged in"
                }
            });

            return;

        }

        next();

    } catch (error) {
        HandleError(res, { error: error });
    }

}

const ValidateUserIsLoggedOut = (req: Request, res: Response, next: NextFunction) => {

    /*
        Makes sure user is logged out.
        If user is already logged in, will send error response
    */

    try {

        const loggedInUserID = req.session.loggedInUserID;

        if (loggedInUserID !== undefined) {

            SendResponse(res, {
                statusCode: 403,
                responseJson: {
                    error: "User is logged in"
                }
            });

            return;

        }

        next();

    } catch (error) {
        HandleError(res, { error: error });
    }

}



// -- == [[ EXPORTS ]] == -- \\

export {
    ValidateUserIsLoggedIn,
    ValidateUserIsLoggedOut
}