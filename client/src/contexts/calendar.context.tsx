// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type MonthNumber,
    type Task,
} from "@shared/types/main.d";

import {
    useEffect,
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

const ENDPOINT_URL = (`${BACKEND_URL}/api/v1/tasks`);

const DEFAULT_OPTIONS: RequestInit = {

    method: "GET",

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
    calendarData: CalendarData,
    loading: boolean,
    error: false | string
}

type CalendarReducerAction = {

    type: "CALENDAR_DATA_UPDATE" | "LOADING_UPDATE" | "ERROR_UPDATE";
    payload: boolean | false | string | CalendarData;

}


// Constants

const TEMP_deftasks: Task = {

    created_on: new Date(),

    name: "Testing displaying tasks",
    description: "This is a test task description",
    task_date: new Date(),
    completed: false,

}

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

                };

            case "ERROR_UPDATE":

                return {

                    ...prevState,

                    loading: false,
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

    const setStateToLoading = () => {

        calendarContextDispatch({
            type: "LOADING_UPDATE",
            payload: true,
        });

    }

    const setStateToError = (errMsg: (string | false) = "Something went wrong") => {

        calendarContextDispatch({
            type: "ERROR_UPDATE",
            payload: errMsg,
        });

    }

    const refreshTasksForMonth = async () => {

        try {

            setStateToLoading();


            // Send request to backend and verify everything is ok

            const response = await fetch(ENDPOINT_URL, DEFAULT_OPTIONS);

            if (!response.ok) {

                switch (response.status) {

                    case 429:
                        setStateToError("Slow down, please");
                        break;
                    default:
                        setStateToError();

                }

                return;

            };


            // Get tasks from response json

            const resJson = await response.json();
            if (!resJson || !resJson.data) throw new Error("Could not get data from response json");

            const fetchedTasks: Task[] = resJson.data;


            // Set calendar data state

            calendarContextDispatch({

                type: "CALENDAR_DATA_UPDATE",

                payload: {
                    ...calendarContextState.calendarData,
                    tasks: fetchedTasks
                }

            });

        } catch (error) {
            setStateToError();
        }

    }


    // useEffect that runs whenever calendar month is updated

    useEffect(() => {
        refreshTasksForMonth();
    }, [calendarContextState.calendarData.month]);

    return (
        <CalendarContext.Provider value={{

            calendarContextState,
            calendarContextDispatch,

        }}>
            {children}
        </CalendarContext.Provider>
    )

}