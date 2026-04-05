// -- == [[ IMPORTS ]] == -- \\

// Packages
import express from 'express';


// Validators

import { ValidateRequestBodyExists } from '@validators/request.validator.js';
import { ValidateUserIsLoggedIn, ValidateUserIsLoggedOut } from '@validators/auth.validator.js';


// Controllers

import {
    GetLoggedInUser,
    LoginUser,
    LogoutUser
} from '@controllers/auth.controller.js';



// -- == [[ INITIALIZE SIGNUP ROUTER ]] == -- \\

const AuthRouter = express.Router();



// -- == [[ ROUTE ENDPOINTS ]] == -- \\

AuthRouter.route("/")
    .post(ValidateRequestBodyExists, ValidateUserIsLoggedOut, LoginUser)
    .delete(ValidateUserIsLoggedIn, LogoutUser)
    .get(ValidateUserIsLoggedIn, GetLoggedInUser);



// -- == [[ EXPORTS ]] == -- \\

export default AuthRouter;