// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type Task,
    type User
} from "@shared/types/main";


// Packages
import { isValidObjectId } from "mongoose";


// Utils
import HandleError from "./handleError.util"



// -- == [[ METHODS ]] == -- \\

// User

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


// Tasks

const SanitizeTask = (task: Task) => {

    try {

        /**
         * No sanitization method yet since tasks don't need to be sanitized atm
         */

        const sanitizedTask: Omit<Task, ("__v" | "created_on")> = {

            _id: task._id,
            creator_id: task.creator_id,

            name: task.name,
            description: task.description,
            task_date: task.task_date,
            completed: task.completed,

        }

        return sanitizedTask;

    } catch (error) {
        HandleError(undefined, { error: error });
    }

}

const SanitizeTasks = (tasks: (Task | string)[]) => {

    try {

        let sanitizedTasks: (Task | string)[] = [];

        tasks.forEach((unsanitizedTask) => {

            if (typeof unsanitizedTask !== "object" && (isValidObjectId(unsanitizedTask) || typeof unsanitizedTask === "string")) {
                sanitizedTasks.push(unsanitizedTask.toString());
                return;
            }

            const newTask: Task = {

                _id: unsanitizedTask._id,

                creator_id: unsanitizedTask.creator_id,
                created_on: unsanitizedTask.created_on,

                name: unsanitizedTask.name,
                description: unsanitizedTask.description,
                task_date: unsanitizedTask.task_date,
                completed: unsanitizedTask.completed,

            }

            sanitizedTasks.push(newTask);

        });

        return sanitizedTasks;

    } catch (error) {
        HandleError(undefined, { error: error });
    }

}



// -- == [[ EXPORTS ]] == -- \\

export {
    SanitizeUser,
    SanitizeTask,
    SanitizeTasks
}