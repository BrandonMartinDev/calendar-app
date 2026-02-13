// -- == [[ IMPORTS ]] == -- \\

// Types

import { Task } from "@shared/types/main";


// Packages

import { Schema, SchemaTypes, model } from "mongoose";



// -- == [[ SCHEMAS ]] == -- \\

const TaskSchema = new Schema<Task>({

    created_on: {
        type: Date,
        default: () => Date.now(),
        required: true
    },

    creator_id: {
        type: SchemaTypes.ObjectId,
        ref: "User"
    },

    name: {

        type: String,

        trim: true,

        minLength: 1,
        maxLength: 100,

        required: true,

    },

    description: {

        type: String,

        trim: true,

        minLength: 1,
        maxLength: 2500,

        required: false,

    },

    task_date: {
        type: Date,
        default: () => Date.now(),
        required: true
    },

    completed: {

        type: Boolean,
        default: false,

    },

});



// -- == [[ MODELS ]] == -- \\

const TaskModel = model<Task>("Task", TaskSchema);



// -- == [[ EXPORTS ]] == -- \\

export {

    TaskSchema,
    TaskModel

}