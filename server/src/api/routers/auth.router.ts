// -- == [[ IMPORTS ]] == -- \\

// Packages
import express from 'express';


// Validators

import { ValidateRequestBodyExists } from '@validators/request.validator';
import { ValidateUserIsLoggedIn, ValidateUserIsLoggedOut } from '@validators/auth.validator';


// Controllers
import { LoginUser, LogoutUser } from '@controllers/auth.controller';



// -- == [[ INITIALIZE SIGNUP ROUTER ]] == -- \\

const AuthRouter = express.Router();



// -- == [[ ROUTE ENDPOINTS ]] == -- \\

AuthRouter.route("/")
    .post(ValidateRequestBodyExists, ValidateUserIsLoggedOut, LoginUser)
    .delete(ValidateUserIsLoggedIn, LogoutUser);



// -- == [[ EXPORTS ]] == -- \\

export default AuthRouter;