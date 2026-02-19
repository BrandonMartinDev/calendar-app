// -- == [[ IMPORTS ]] == -- \\

// Packages
import express from 'express';


// Validators
import { ValidateUserIsLoggedOut } from '@validators/auth.validator';


// Controllers
import { SignupUser } from 'api/controllers/signup.controller';



// -- == [[ INITIALIZE SIGNUP ROUTER ]] == -- \\

const SignupRouter = express.Router();



// -- == [[ ROUTE ENDPOINTS ]] == -- \\

SignupRouter.route("/")
    .post(ValidateUserIsLoggedOut, SignupUser);



// -- == [[ EXPORTS ]] == -- \\

export default SignupRouter;