// -- == [[ IMPORTS ]] == -- \\

// Interfaces

import { SessionData } from 'express-session';



// -- == [[ DECLARATIONS ]] == -- \\

declare module 'express-session' {
    interface SessionData {
        loggedInUserID?: string; // Make optional with ? if not always present
    }
}