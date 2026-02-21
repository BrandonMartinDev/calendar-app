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
import { GetUserByUsername } from "@services/user.service";
import { CompareHashes, HashText } from "@utils/hash.util";



// -- == [[ METHODS ]] == -- \\

const RejectAuth = async (res: Response) => {

    try {

        SendResponse(res, {
            statusCode: 400,
            responseJson: {
                error: "Username or password is incorrect"
            }
        });

    } catch (error) {
        HandleError(res, { error: error });
    }

}

const LoginUser = async (req: Request, res: Response, next: NextFunction) => {

    try {

        // Makes sure username and password from request body exist

        const { username, password } = req.body;

        if (!username || !password) {
            RejectAuth(res);
            return;
        }


        // Gets user info if user exists

        const user = await GetUserByUsername(username);

        if (!user) {
            RejectAuth(res);
            return;
        }


        // Gets user's hashed password and compares it to password provided

        const hashedPassword = user.password;
        if (!hashedPassword) throw new Error("Could not get password from user in db");

        const matches = await CompareHashes(password, hashedPassword);

        if (matches !== true) {
            RejectAuth(res);
            return;
        }


        // Attaches userid to session and sends response

        req.session.loggedInUserID = user._id;

        SendResponse(res, {
            statusCode: 200,
            responseJson: {
                message: (`Successfully logged in user as '${username}' (${user._id})`)
            }
        });

    } catch (error) {
        HandleError(res, { error: error });
    }

}

const LogoutUser = async (req: Request, res: Response, next: NextFunction) => {

    try {

        // Deletes userid from session and sends response

        delete req.session.loggedInUserID;

        SendResponse(res, {
            statusCode: 200,
            responseJson: {
                message: (`Successfully logged out user`)
            }
        });

    } catch (error) {
        HandleError(res, { error: error });
    }

}



// -- == [[ EXPORTS ]] == -- \\

export {
    LoginUser,
    LogoutUser
}