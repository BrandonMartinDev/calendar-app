// -- == [[ IMPORTS ]] == -- \\

// Shared
import { User } from "@shared/types/main";


// Packages
import mongoose from "mongoose";


// Schemas
import { UserModel } from "@schemas/User.schema";


// Utils
import HandleError from "@utils/handleError.util"
import { HashText } from "@utils/hash.util";



// -- == [[ METHODS ]] == -- \\

// Get/find

const GetUserByUsername = async (username: string, populateTasks: boolean = false) => {

    try {

        // Ensure username was provided

        if (!username) throw new Error("Username was not provided");


        // Find user in database and return it

        let user: User | null;

        if (populateTasks === true) {
            user = await UserModel.findOne().where("username").equals(username).populate("created_tasks");
        } else {
            user = await UserModel.findOne().where("username").equals(username);
        }

        return user;

    } catch (error) {
        HandleError(undefined, { error: error });
    }

}

const GetUserByID = async (userID: (string | mongoose.Types.ObjectId), populateTasks: boolean = false) => {

    try {

        // Ensure userID was provided

        if (!userID) throw new Error("userID was not provided");


        // Find user in database and return it

        let user;

        if (populateTasks === true) {
            user = await UserModel.findOne().where("_id").equals(userID).populate("created_tasks");
        } else {
            user = await UserModel.findOne().where("_id").equals(userID);
        }

        return user;

    } catch (error) {
        HandleError(undefined, { error: error });
    }

}


// Create

const CreateNewUser = async (username: string, plaintextPassword: string) => {

    try {

        // Ensure username/plaintextPassword were provided

        if (!username) throw new Error("username was not provided");
        if (!plaintextPassword) throw new Error("plaintextPassword was not provided");


        // Hash plaintext password

        const hashedPassword = await HashText(plaintextPassword);
        if (!hashedPassword) throw new Error("Could not hash password");


        // Create new user with username and hashed password

        const newUser = await UserModel.create({
            username: username,
            password: hashedPassword
        });


        // Save newUser to db and return newUser

        await newUser.save();
        return newUser;

    } catch (error) {
        HandleError(undefined, { error: error });
    }

}



// -- == [[ EXPORTS ]] == -- \\

export {

    // Get/find
    GetUserByUsername,
    GetUserByID,


    // Create
    CreateNewUser

}