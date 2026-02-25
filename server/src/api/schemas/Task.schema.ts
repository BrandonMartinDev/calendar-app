// -- == [[ IMPORTS ]] == -- \\

// Types

import { Task } from "@shared/types/main";


// Packages

import { Schema, SchemaTypes, model } from "mongoose";



// -- == [[ SCHEMAS ]] == -- \\

const TaskSchema = new Schema<Task>({

    // When task was created in db

    created_on: {
        type: Date,
        default: () => Date.now(),
        required: true
    },


    // What user created task

    creator_id: {
        type: SchemaTypes.ObjectId,
        ref: "User"
    },


    // Name of task

    name: {

        type: String,

        trim: true,

        minLength: 1,
        maxLength: 100,

        required: true,

    },


    // Description of task

    description: {

        type: String,

        trim: true,

        minLength: 1,
        maxLength: 2500,

        required: false,

    },


    // Date user set for task

    task_date: {
        type: Date,
        default: () => Date.now(),
        required: true
    },



    // Whether task has been marked completed by user

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