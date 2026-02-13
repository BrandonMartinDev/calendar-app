// -- == [[ IMPORTS ]] == -- \\

// Types

import { User } from "@shared/types/main";


// Packages

import { Schema, model } from "mongoose";


// Schemas

import { TaskSchema } from "@schemas/Task.schema";



// -- == [[ SCHEMAS ]] == -- \\

const UserSchema = new Schema<User>({

    created_on: {
        type: Date,
        default: () => Date.now()
    },

    username: {

        type: String,

        lowercase: true,
        trim: true,
        unique: true,

        minLength: 3,
        maxLength: 30,

        required: true,
        immutable: true,
        match: new RegExp(/.+/g) // FIXME: ADD USERNAME REGEX

    },

    password: {

        type: String,
        required: true,
        match: new RegExp(/.+/g) // FIXME: ADD PASSWORD REGEX

    },

    created_tasks: {
        type: [TaskSchema],
        ref: "Task"
    }

});



// -- == [[ MODELS ]] == -- \\

const UserModel = model<User>("User", UserSchema);



// -- == [[ EXPORTS ]] == -- \\

export {

    UserSchema,
    UserModel

}