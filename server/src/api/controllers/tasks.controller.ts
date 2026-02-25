// -- == [[ IMPORTS ]] == -- \\

// Types

import { Task } from "@shared/types/main";

import {
    type Request,
    type Response,
    type NextFunction
} from "express";


// Utils

import HandleError from "@utils/handleError.util";
import SendResponse from "@utils/sendResponse.util";
import { SanitizeTask, SanitizeTasks } from "@utils/sanitize.util";


// Services

import { GetUserByID } from "@services/user.service";
import { CreateNewUserTask } from "@services/tasks.service";



// -- == [[ METHODS ]] == -- \\

const RejectTaskAction = async (res: Response) => {

    try {

        SendResponse(res, {
            statusCode: 400,
            responseJson: {
                error: "Request format is invalid"
            }
        });

    } catch (error) {
        HandleError(res, { error: error });
    }

}



// Get

const GetUserTasks = async (req: Request, res: Response, next: NextFunction) => {

    try {

        // Get user info from logged in user id

        const loggedInUserID = req.session.loggedInUserID;
        if (!loggedInUserID) throw new Error("Could not get loggedInUserID");

        const user = await GetUserByID(loggedInUserID, true);
        if (!user) throw new Error("Could not get user from loggedInUserID");


        // Get info from user and sanitize created_tasks

        const { created_tasks, _id, username } = user;

        const sanitizedTasks = SanitizeTasks(created_tasks);

        SendResponse(res, {
            statusCode: 200,
            responseJson: {
                message: (`Successfully got user '${username}' (${_id}) tasks`),
                data: sanitizedTasks
            }
        });

    } catch (error) {
        HandleError(res, { error: error });
    }

}


// Create

const CreateNewTask = async (req: Request, res: Response, next: NextFunction) => {

    try {

        // Gets loggedInUserID from session

        const loggedInUserID = req.session.loggedInUserID;
        if (!loggedInUserID) throw new Error("Could not get logged in user id");


        // Get new task info from request body and verifies name exists on req body

        const {
            name,
            description,
            task_date,
            completed
        } = req.body;

        if (!name) {
            RejectTaskAction(res);
            return;
        }


        // TODO:

        // Create new task info from request body

        const newTaskInfo: Omit<Task, ("created_on" | "creator_id")> = {

            name: name,
            description: description,
            task_date: task_date || new Date(),
            completed: completed || false,

        }

        const newTask = await CreateNewUserTask(loggedInUserID, newTaskInfo);
        if (!newTask) throw new Error("Could not create new task");


        // Sanitize newly created task and return

        const sanitizedTask = SanitizeTask(newTask);
        if (!sanitizedTask) throw new Error("Could not sanitize task");

        SendResponse(res, {
            statusCode: 201,
            responseJson: {
                message: (`Created task '${sanitizedTask._id}' successfully`),
                data: sanitizedTask
            }
        });

    } catch (error) {
        HandleError(res, { error: error });
    }

}



// -- == [[ EXPORTS ]] == -- \\

export {

    // Get
    GetUserTasks,

    // Create
    CreateNewTask

}