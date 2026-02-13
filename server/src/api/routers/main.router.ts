// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type Request,
    type Response,
    type NextFunction
} from "express";


// Modules

import express from 'express';


// Utils

import HandleError from '@utils/handleError.util';
import SendResponse from "@utils/sendResponse.util";



// -- == [[ INITIALIZE MAIN ROUTER ]] == -- \\

const MainRouter = express.Router();



// -- == [[ ROUTE ENDPOINTS TO ROUTERS ]] == -- \\




// -- == [[ HANDLE CATCH-ALL ENDPOINTS ]] == -- \\

MainRouter.get("/", (req: Request, res: Response, next: NextFunction) => {

    try {

        SendResponse(res, {
            statusCode: 200,
            responseJson: {
                message: "/api/v1/ is OK"
            }
        });

    } catch (error) {
        HandleError(undefined, { error: error });
    }

});


// -- == [[ EXPORTS ]] == -- \\

export default MainRouter;