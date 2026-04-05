// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type Task,
    type User
} from "@shared/types/main.js";


// Packages
import { isValidObjectId } from "mongoose";


// Utils
import HandleError from "./handleError.util.js"



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

type SanitizedTask = Omit<Task, ("__v" | "created_on")>;

const SanitizeTask = (task: Task) => {

    try {

        /**
         * No sanitization method yet since tasks don't need to be sanitized atm
         */

        const sanitizedTask: SanitizedTask = {

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

        let sanitizedTasks: (SanitizedTask | string)[] = [];

        tasks.forEach((unsanitizedTask) => {

            if (typeof unsanitizedTask !== "object" && (isValidObjectId(unsanitizedTask) || typeof unsanitizedTask === "string")) {
                sanitizedTasks.push(unsanitizedTask.toString());
                return;
            }

            const sanitizedTask = SanitizeTask(unsanitizedTask);
            if (!sanitizedTask) throw new Error("Could not get sanitized task");

            sanitizedTasks.push(sanitizedTask);

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