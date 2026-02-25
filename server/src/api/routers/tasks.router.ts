// -- == [[ IMPORTS ]] == -- \\

// Packages
import express from "express";


// Validators

import { ValidateUserIsLoggedIn } from "@validators/auth.validator";
import { ValidateRequestBodyExists } from "@validators/request.validator";


// Controllers
import { CreateNewTask, GetUserTasks } from "@controllers/tasks.controller";



// -- == [[ INITIALIZE TASK ROUTER ]] == -- \\

const TaskRouter = express.Router();



// -- == [[ ROUTE ENDPOINTS ]] == -- \\

// TaskRouter.route("/:task_id")
//     .get(ValidateUserIsLoggedIn)
//     .put(ValidateUserIsLoggedIn)
//     .delete(ValidateUserIsLoggedIn);

TaskRouter.route("/")
    .get(ValidateUserIsLoggedIn, GetUserTasks)
    .post(ValidateRequestBodyExists, ValidateUserIsLoggedIn, CreateNewTask);



// -- == [[ EXPORTS ]] == -- \\

export default TaskRouter;