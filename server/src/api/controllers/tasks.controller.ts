// -- == [[ IMPORTS ]] == -- \\

// Types

import { Task } from "@shared/types/main.js";

import {
    type Request,
    type Response,
    type NextFunction
} from "express";


// Utils

import HandleError from "@utils/handleError.util.js";
import SendResponse from "@utils/sendResponse.util.js";
import { SanitizeTask, SanitizeTasks } from "@utils/sanitize.util.js";


// Services

import { GetUserByID } from "@services/user.service.js";
import { CreateNewUserTask, DeleteSpecificTask, GetSpecificTaskInfo } from "@services/tasks.service.js";



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

const RejectMissingTask = async (res: Response) => {

    try {

        SendResponse(res, {
            statusCode: 404,
            responseJson: {
                error: "Task info does not exist"
            }
        });

    } catch (error) {
        HandleError(res, { error: error });
    }

}



// Get

const GetUserTasksController = async (req: Request, res: Response, next: NextFunction) => {

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

const GetSpecificTaskInfoController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        // Get user info from logged in user id

        const loggedInUserID = req.session.loggedInUserID;
        if (!loggedInUserID) throw new Error("Could not get loggedInUserID");

        const user = await GetUserByID(loggedInUserID, true);
        if (!user) throw new Error("Could not get user from loggedInUserID");


        // Get task info from params

        const { task_id } = req.params;
        if (!task_id) throw new Error("Could not get task_id from params");

        const task = await GetSpecificTaskInfo(task_id.toString());

        if (!task) {
            RejectMissingTask(res);
            return;
        }


        // Checks if logged in user owns task

        if (task.creator_id.toString() !== user._id.toString()) {

            SendResponse(res, {
                statusCode: 401,
                responseJson: {
                    error: "Unauthorized"
                }
            });

            return;

        }


        // Sanitize task and return it

        const sanitizedTask = SanitizeTask(task);

        SendResponse(res, {
            statusCode: 200,
            responseJson: {
                message: (`Successfully got task '${task_id}'`),
                data: sanitizedTask
            }
        });

    } catch (error) {
        HandleError(res, { error: error });
    }

}



// Create

const CreateNewTaskController = async (req: Request, res: Response, next: NextFunction) => {

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



// Delete

const DeleteTaskController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        // Get user info from logged in user id

        const loggedInUserID = req.session.loggedInUserID;
        if (!loggedInUserID) throw new Error("Could not get loggedInUserID");

        const user = await GetUserByID(loggedInUserID, true);
        if (!user) throw new Error("Could not get user from loggedInUserID");


        // Get task info from params

        const { task_id } = req.params;
        if (!task_id) throw new Error("Could not get task_id from params");

        const task = await GetSpecificTaskInfo(task_id.toString());

        if (!task) {
            RejectMissingTask(res);
            return;
        }


        // Ensures logged in user owns task

        if (task.creator_id.toString() !== user._id.toString()) {

            SendResponse(res, {
                statusCode: 401,
                responseJson: {
                    error: "Unauthorized"
                }
            });

            return;

        }


        // Delete task from db and user

        await DeleteSpecificTask(task_id.toString());

        SendResponse(res, {
            statusCode: 200,
            responseJson: {
                message: `Successfully deleted task (${task_id.toString()})`
            }
        });

    } catch (error) {
        HandleError(res, { error: error });
    }

}



// Edit

const EditSpecificTaskController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        // Get user info from logged in user id

        const loggedInUserID = req.session.loggedInUserID;
        if (!loggedInUserID) throw new Error("Could not get loggedInUserID");

        const user = await GetUserByID(loggedInUserID, true);
        if (!user) throw new Error("Could not get user from loggedInUserID");


        // Get task info from params

        const { task_id } = req.params;
        if (!task_id) throw new Error("Could not get task_id from params");

        const task = await GetSpecificTaskInfo(task_id.toString());

        if (!task) {
            RejectMissingTask(res);
            return;
        }


        // Ensures logged in user owns task

        if (task.creator_id.toString() !== user._id.toString()) {

            SendResponse(res, {
                statusCode: 401,
                responseJson: {
                    error: "Unauthorized"
                }
            });

            return;

        }


        // Gets new task info from request body and verifies it exists

        const {
            name,
            description,
            task_date,
            completed
        } = req.body;

        if (!name || !task_date || typeof completed !== "boolean") {
            RejectTaskAction(res);
            return;
        }


        // Sets task's info to info from request body and saves it to db

        task.name = name;
        task.description = description;
        task.task_date = task_date;
        task.completed = completed;

        await task.save();


        // Sanitizes new task and returns response

        const sanitizedTask = SanitizeTask(task);

        SendResponse(res, {
            statusCode: 200,
            responseJson: {
                message: (`Successfully updated ${task._id}`),
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
    GetUserTasksController,
    GetSpecificTaskInfoController,

    // Create
    CreateNewTaskController,

    // Delete
    DeleteTaskController,

    // Edit
    EditSpecificTaskController

}