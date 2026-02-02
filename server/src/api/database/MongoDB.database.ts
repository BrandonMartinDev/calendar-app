// -- == [[ IMPORTS ]] == -- \\

// Config
import { MONGO_CONNECTION_STRING } from "@config/defaults.config";


// Modules
import mongoose from "mongoose";


// Utils
import HandleError from "@utils/handleError.util";



// -- == [[ TYPES ]] == -- \\

enum DatabaseStatus {
    LOADING,
    SUCCESSFULLY_CONNECTED,
    ERROR
}



// -- == [[ METHODS ]] == -- \\

let DB_STATUS: DatabaseStatus = DatabaseStatus.LOADING;

const ConnectToDB = async () => {

    try {

        const connection = await mongoose.connect(MONGO_CONNECTION_STRING);
        if (!connection) throw new Error("Could not connect to database!");

        DB_STATUS = DatabaseStatus.SUCCESSFULLY_CONNECTED;

    } catch (error) {
        HandleError(undefined, { error: error });
        DB_STATUS = DatabaseStatus.ERROR;
    }

}



// -- == [[ EXPORTS ]] == -- \\

export {
    
    ConnectToDB,
    
    DatabaseStatus,
    DB_STATUS
    
}