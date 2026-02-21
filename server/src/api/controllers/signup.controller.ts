// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type Request,
    type Response,
    type NextFunction
} from "express";


// Services
import { CreateNewUser, GetUserByUsername } from "@services/user.service";


// Utils

import HandleError from "@utils/handleError.util";
import SendResponse from "@utils/sendResponse.util";



// -- == [[ METHODS ]] == -- \\

const SignupUser = async (req: Request, res: Response, next: NextFunction) => {

    try {

        // Makes sure username and password from request body exist

        const { username, password } = req.body;
        
        if (!username || !password) {

            SendResponse(res, {
                statusCode: 400,
                responseJson: {
                    error: "Invalid request"
                }
            })

            return;

        }


        // Checks if user already exists

        const user = await GetUserByUsername(username);

        if (user) {

            SendResponse(res, {
                statusCode: 400,
                responseJson: {
                    error: "User already exists"
                }
            })

            return;

        }


        // Create new user with provided username and password and respond

        const newUser = await CreateNewUser(username, password);
        if (!newUser) throw new Error(`Could not create new user '${username}'`);

        SendResponse(res, {

            statusCode: 200,
            responseJson: {
                message: `Created new user '${newUser.username}'`
            }

        });

    } catch (error) {
        HandleError(res, { error: error });
    }

}



// -- == [[ EXPORTS ]] == -- \\

export {
    SignupUser
}