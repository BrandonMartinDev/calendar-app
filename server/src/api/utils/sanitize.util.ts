// -- == [[ IMPORTS ]] == -- \\

// Types
import { User } from "@shared/types/main";

// Utils
import HandleError from "./handleError.util"



// -- == [[ METHODS ]] == -- \\

const SanitizeUser = (user: User) => {

    try {

        const newUser: Omit<User, "password"> = {
            _id: user._id,
            username: user.username,
            created_tasks: user.created_tasks,
            created_on: user.created_on
        }

        return newUser;

    } catch (error) {
        HandleError(undefined, { error: error });
    }

}



// -- == [[ EXPORTS ]] == -- \\

export {
    SanitizeUser
}