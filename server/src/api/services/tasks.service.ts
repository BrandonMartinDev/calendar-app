// -- == [[ IMPORTS ]] == -- \\

// Shared
import { Task, User } from "@shared/types/main";


// Packages
import mongoose from "mongoose";


// Models
import { TaskModel } from "@schemas/Task.schema";


// Services
import { GetUserByID } from "./user.service";


// Utils
import HandleError from "@utils/handleError.util"



// -- == [[ TYPES ]] == -- \\

type IDType = string | mongoose.Types.ObjectId;



// -- == [[ METHODS ]] == -- \\

// Get

const GetSpecificTaskInfo = async (taskID: IDType, populateCreatorID: boolean = false) => {

    try {

        // Ensure taskID was provided

        if (!taskID) throw new Error("taskID was not provided");


        // Find task in database and return it

        let task;

        if (populateCreatorID === true) {
            task = await TaskModel.findOne().where("_id").equals(taskID).populate("creator_id");
        } else {
            task = await TaskModel.findOne().where("_id").equals(taskID);
        }

        return task;

    } catch (error) {
        HandleError(undefined, { error: error });
    }

}


// Create

const CreateNewUserTask = async (userID: IDType, taskInfo: Omit<Task, ("created_on" | "creator_id")>) => {

    try {

        // Get user from DB

        const user = await GetUserByID(userID);
        if (!user) throw new Error("Could not get user info");


        // Create new task object

        const createdTask = new TaskModel();

        createdTask.creator_id = (user._id as string);
        createdTask.name = taskInfo.name;
        createdTask.description = taskInfo.description;
        createdTask.task_date = taskInfo.task_date;
        createdTask.completed = taskInfo.completed;



        // Add task id to user's task array

        user.created_tasks = [...user.created_tasks, createdTask._id];


        // Save created task and user to DB

        await createdTask.save();
        await user.save();

        return createdTask;

    } catch (error) {
        HandleError(undefined, { error: error });
    }

}


// Delete

const DeleteSpecificTask = async (taskID: IDType) => {

    try {

        // Get task from DB

        const task = await GetSpecificTaskInfo(taskID);
        if (!task) throw new Error("Could not get task info");


        // Get task creator from user db

        const user = await GetUserByID(task.creator_id as string);
        if (!user) throw new Error("Could not get user");


        // Remove task from user created_tasks array

        const newCreatedTasks = [...user.created_tasks].filter((createdTaskID) => createdTaskID !== task._id);
        if (!newCreatedTasks) throw new Error("Could not filter user.created_tasks");

        user.created_tasks = newCreatedTasks;
        await user.save();


        // Delete task from db

        await TaskModel.deleteOne().where("_id").equals(task._id);

    } catch (error) {
        HandleError(undefined, { error: error });
    }

}



// -- == [[ EXPORTS ]] == -- \\

export {

    // Get
    GetSpecificTaskInfo,

    // Create
    CreateNewUserTask,

    // Delete
    DeleteSpecificTask

}