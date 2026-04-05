// -- == [[ IMPORTS ]] == -- \\

// Packages
import express from 'express';


// Validators
import { ValidateUserIsLoggedOut } from '@validators/auth.validator.js';


// Controllers
import { SignupUser } from '@controllers/signup.controller.js';



// -- == [[ INITIALIZE SIGNUP ROUTER ]] == -- \\

const SignupRouter = express.Router();



// -- == [[ ROUTE ENDPOINTS ]] == -- \\

SignupRouter.route("/")
    .post(ValidateUserIsLoggedOut, SignupUser);



// -- == [[ EXPORTS ]] == -- \\

export default SignupRouter;