// -- == [[ IMPORTS ]] == -- \\

// Packages
import express from "express";


// Validators

import { ValidateUserIsLoggedIn } from "@validators/auth.validator";
import { ValidateRequestBodyExists } from "@validators/request.validator";


// Controllers

import {

    GetUserTasksController,
    GetSpecificTaskInfoController,

    CreateNewTaskController,

    DeleteTaskController,
    
    EditSpecificTaskController,

} from "@controllers/tasks.controller";



// -- == [[ INITIALIZE TASK ROUTER ]] == -- \\

const TaskRouter = express.Router();



// -- == [[ ROUTE ENDPOINTS ]] == -- \\

TaskRouter.route("/:task_id")
    .get(ValidateUserIsLoggedIn, GetSpecificTaskInfoController)
    .delete(ValidateUserIsLoggedIn, DeleteTaskController)
    .put(ValidateRequestBodyExists, ValidateUserIsLoggedIn, EditSpecificTaskController);

TaskRouter.route("/")
    .get(ValidateUserIsLoggedIn, GetUserTasksController)
    .post(ValidateRequestBodyExists, ValidateUserIsLoggedIn, CreateNewTaskController);



// -- == [[ EXPORTS ]] == -- \\

export default TaskRouter;