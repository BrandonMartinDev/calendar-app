// -- == [[ IMPORTS ]] == -- \\

// Types

import type { Task } from "@shared/types/main";



// -- == [[ METHODS ]] == -- \\

const isValidTaskData = (taskData: Task) => {

    // Destructure taskDate

    const {
        name,
        description,
    } = taskData;
    

    // Validate name is between 1-100 characters
    if (name.length < 1 || name.length > 100) return false;

    // Validate description is between 0-2500 characters
    if (description && (description.length < 0 || description.length > 100)) return false;


    // Return true if passed all validations
    return true;

}



// -- == [[ EXPORTS ]] == -- \\

export default isValidTaskData;