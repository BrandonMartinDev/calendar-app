// -- == [[ IMPORTS ]] == -- \\

// Types

import { User } from "@shared/types/main.js";


// Packages

import { Schema, SchemaTypes, model } from "mongoose";



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
        type: [SchemaTypes.ObjectId],
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