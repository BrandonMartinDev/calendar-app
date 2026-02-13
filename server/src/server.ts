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


// Database
import { ConnectToDB, DatabaseStatus, DB_STATUS } from "@database/MongoDB.database";


// Express
import express from "express";


// Routers
import MainRouter from "@routers/main.router";


// Utils

import SendResponse from "@utils/sendResponse.util";
import HandleError from "@utils/handleError.util";



// -- == [[ INITIALIZE EXPRESS ]] == -- \\

const app = express();


app.use("/api/v1", MainRouter);



// -- == [[ HANDLE CATCH-ALL ENDPOINTS ]] == -- \\

app.get("/", (req: Request, res: Response) => {

    try {

        switch (DB_STATUS) {

            case DatabaseStatus.ERROR:

                SendResponse(res, {
                    statusCode: 500,
                    responseJson: {
                        error: "Could not connect to database"
                    }
                });

                break;

            case DatabaseStatus.LOADING:

                SendResponse(res, {
                    statusCode: 200,
                    responseJson: {
                        message: "Connecting to database"
                    }
                });

                break;

            case DatabaseStatus.SUCCESSFULLY_CONNECTED:

                SendResponse(res, {
                    statusCode: 200,
                    responseJson: {
                        message: "Server is OK"
                    }
                });

                break;


        }

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

        // Start listening to requests

        app.listen(PORT, () => {
            console.warn("CALENDAR APP SERVER SUCCESSFULLY LISTENING ON PORT:", PORT);
        });


        // Attempt to connect to database

        console.log("CONNECTING TO DATABASE...");
        await ConnectToDB();
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");

    } catch (error) {
        HandleError(undefined, { error: error });
    }

}

main();