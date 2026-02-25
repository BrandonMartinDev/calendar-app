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

type UserID = string | mongoose.Types.ObjectId;



// -- == [[ METHODS ]] == -- \\

// Create

const CreateNewUserTask = async (userID: UserID, taskInfo: Omit<Task, ("created_on" | "creator_id")>) => {

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



// -- == [[ EXPORTS ]] == -- \\

export {

    // Create
    CreateNewUserTask

}