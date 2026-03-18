// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type MonthNumber,
    type Task,
} from "@shared/types/main.d";

import {
    type PropsWithChildren
} from 'react';


// Shared

import { BACKEND_URL } from "@shared/config/settings.config";


// Packages

import {
    createContext,
    useReducer,
} from "react";



// -- == [[ CONSTANTS ]] == -- \\

const ENDPOINT_URL = (`${BACKEND_URL}/api/v1/auth`);

const DEFAULT_OPTIONS: RequestInit = {

    method: "POST",

    credentials: "include",

    headers: {
        "content-type": "application/json"
    }

}



// -- == [[ REDUCERS ]] == -- \\

// Types

type CalendarData = {

    month: MonthNumber;
    year: number;
    tasks: Task[];

}

type CalendarStateType = {
    calendarData?: CalendarData,
    loading: boolean,
    error: false | string
}

type CalendarReducerAction = {

    type: "CALENDAR_DATA_UPDATE" | "LOADING_UPDATE" | "ERROR_UPDATE";
    payload: boolean | false | string | CalendarData | undefined;

}


// Constants

const defaultCalendarState: CalendarStateType = {

    calendarData: {

        month: new Date().getMonth() as MonthNumber,
        year: new Date().getFullYear(),
        tasks: []

    },

    loading: true,
    error: false

}


// Methods

const CalendarReducer = (prevState: CalendarStateType, action: CalendarReducerAction) => {

    try {

        switch (action.type) {

            case "CALENDAR_DATA_UPDATE":

                return {

                    ...prevState,

                    loading: false,
                    error: false as false,
                    calendarData: action.payload as CalendarData

                };

            case "LOADING_UPDATE":

                return {

                    ...prevState,

                    loading: action.payload as boolean,
                    error: false as false,
                    calendarData: undefined

                };

            case "ERROR_UPDATE":

                return {

                    ...prevState,

                    loading: false,
                    calendarData: undefined,
                    error: action.payload as (string | false)

                };

            default:
                throw new Error("ACTION TYPE IS INVALID: " + action.type);

        }

    } catch (error) {

        console.warn("USER REDUCER ERROR: DID NOT UPDATE USER REDUCER");
        console.warn(error);

        return prevState;

    }

}



// -- == [[ CONTEXTS ]] == -- \\

type CalendarContextType = {

    calendarContextState: CalendarStateType;
    calendarContextDispatch: React.ActionDispatch<[action: CalendarReducerAction]>;

}

export const CalendarContext = createContext<CalendarContextType>({
    calendarContextState: defaultCalendarState,
    calendarContextDispatch: () => { },
});



// -- == [[ PROVIDERS ]] == -- \\

export const CalendarContextProvider = ({ children }: PropsWithChildren) => {

    const [calendarContextState, calendarContextDispatch] = useReducer(CalendarReducer, defaultCalendarState);

    return (
        <CalendarContext.Provider value={{

            calendarContextState,
            calendarContextDispatch,

        }}>
            {children}
        </CalendarContext.Provider>
    )

}