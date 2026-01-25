// -- == [[ IMPORTS ]] == -- \\

// Modules

import {
    type Response
} from 'express';


// Utils

import HandleError from './handleError.util';



// -- == [[ TYPES ]] == -- \\

type ServerResponseJson = {

    message?: string;
    error?: string;
    data?: any;

}

type ServerResponseInfo = {
    statusCode: number;
    responseJson: ServerResponseJson;
}



// -- == [[ METHODS ]] == -- \\

const SendResponse = (res: Response, responseInfo: ServerResponseInfo) => {

    try {

        res.status(responseInfo.statusCode);
        res.json(responseInfo.responseJson);

    } catch (error) {
        HandleError(undefined, { error: error });
    }

}



// -- == [[ EXPORTS ]] == -- \\

export default SendResponse;