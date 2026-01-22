// -- == [[ IMPORTS ]] == -- \\

// Obligatory dotenv import

import "dotenv/config";


// Config

import { PORT } from "@config/defaults.config";


// Express

import express from "express";



// -- == [[ INITIALIZE EXPRESS ]] == -- \\

const app = express();




// -- == [[ INITIALIZE SERVER ]] == -- \\


const main = async () => {

    try {

        app.listen(PORT, () => {
            console.warn("CALENDAR APP SERVER SUCCESSFULLY LISTENING ON PORT:", PORT);
        })

    } catch (error) {

    }

}

main();