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

import HandleError from '@utils/handleError.util.js';
import SendResponse from "@utils/sendResponse.util.js";


// Routers

import SignupRouter from "@routers/signup.router.js";
import AuthRouter from "@routers/auth.router.js";
import TaskRouter from "@routers/tasks.router.js";



// -- == [[ INITIALIZE MAIN ROUTER ]] == -- \\

const MainRouter = express.Router();



// -- == [[ ROUTE ENDPOINTS TO ROUTERS ]] == -- \\

MainRouter.use("/signup", SignupRouter);
MainRouter.use("/auth", AuthRouter);
MainRouter.use("/tasks", TaskRouter);



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