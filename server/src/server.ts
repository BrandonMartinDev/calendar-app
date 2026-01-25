// -- == [[ IMPORTS ]] == -- \\

// Obligatory dotenv import
import "dotenv/config";


// Types

import {
    type Request,
    type Response,
    type NextFunction
} from "express";


// Config
import { PORT } from "@config/defaults.config";


// Express
import express from "express";


// Routers
import MainRouter from "@routers/main.router";


// Utils

import SendResponse from "api/utils/sendResponse.util";
import HandleError from "api/utils/handleError.util";



// -- == [[ INITIALIZE EXPRESS ]] == -- \\

const app = express();


app.use("/api/v1", MainRouter);



// -- == [[ HANDLE CATCH-ALL ENDPOINTS ]] == -- \\

app.get("/", (req: Request, res: Response) => {

    try {

        SendResponse(res, {
            statusCode: 200,
            responseJson: {
                message: "Server is OK"
            }
        })

    } catch (error) {
        HandleError(res, { error: error });
    }

});


app.all("/*splat", (req: Request, res: Response, next: NextFunction) => {

    try {

        SendResponse(res, {
            statusCode: 404,
            responseJson: {
                message: (`Requested resource '${req.method} ${req.originalUrl}' could not be found`)
            }
        })

    } catch (error) {
        HandleError(res, { error: error });
    }

});



// -- == [[ INITIALIZE SERVER ]] == -- \\

const main = async () => {

    try {

        app.listen(PORT, () => {
            console.warn("CALENDAR APP SERVER SUCCESSFULLY LISTENING ON PORT:", PORT);
        });

    } catch (error) {
        HandleError(undefined, { error: error });
    }

}

main();