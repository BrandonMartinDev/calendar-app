// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type User,
    type Task
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

type UserStateType = {
    userData?: User,
    loading: boolean,
    error: false | string
}

type UserReducerAction = {

    type: "USER_DATA_UPDATE" | "LOADING_UPDATE" | "ERROR_UPDATE";
    payload: UserStateType | User | string | boolean | Date | Task[] | undefined;

}


// Constants

const defaultUserState: UserStateType = {
    userData: undefined,
    loading: true,
    error: false
}


// Methods

const UserReducer = (prevState: UserStateType, action: UserReducerAction) => {

    try {

        switch (action.type) {

            case "USER_DATA_UPDATE":

                return {

                    ...prevState,

                    loading: false,
                    error: false as false,
                    userData: action.payload as User

                };

            case "LOADING_UPDATE":

                return {

                    ...prevState,

                    loading: action.payload as boolean,
                    error: false as false,
                    userData: undefined

                };

            case "ERROR_UPDATE":

                return {

                    ...prevState,

                    loading: false,
                    userData: undefined,
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

type UserContextType = {

    userContextState: UserStateType;
    userContextDispatch: React.ActionDispatch<[action: UserReducerAction]>;
    login: (username: string, password: string) => any;

}

export const UserContext = createContext<UserContextType>({
    userContextState: defaultUserState,
    userContextDispatch: () => { },
    login: () => { }
});



// -- == [[ PROVIDERS ]] == -- \\

export const UserContextProvider = ({ children }: PropsWithChildren) => {

    const [userContextState, userContextDispatch] = useReducer(UserReducer, defaultUserState);


    // Change user state methods

    const resetUserState = async () => {

        userContextDispatch({
            type: "USER_DATA_UPDATE",
            payload: undefined
        });

    }

    const setUserToLoading = async () => {

        userContextDispatch({
            type: "LOADING_UPDATE",
            payload: true
        });

    }

    const setUserToError = async (errMsg: string = "Something went wrong") => {

        userContextDispatch({
            type: "ERROR_UPDATE",
            payload: errMsg
        });

    }


    // Methods

    const refreshCurrentUserInfo = async () => {

        try {

            // Sets user state to loading and sends get user info request to backend

            setUserToLoading();

            const options = { ...DEFAULT_OPTIONS, method: "GET" }

            const response = await fetch(ENDPOINT_URL, options);


            // Checks if response is ok and parses json from response

            if (!response.ok) {

                switch (response.status) {

                    case 401:
                        resetUserState();
                        break;
                    case 403:
                        setUserToError("You are not authorized to access this resource");
                        break;
                    case 429:
                        setUserToError("You're sending too many responses too quickly");
                        break;
                    default:
                        setUserToError();

                }

                return;

            };

            const responseJSON = await response.json();
            if (!responseJSON) throw new Error("Could not parse JSON from response");

            userContextDispatch({
                type: "USER_DATA_UPDATE",
                payload: responseJSON.data
            });

        } catch (error) {
            setUserToError();
        }

    }

    const login = async (username: string, password: string) => {

        try {

            // Sets user state to loading and sends login request to backend

            setUserToLoading();

            const reqBody = JSON.stringify({ username, password });
            const options = { ...DEFAULT_OPTIONS, body: reqBody };

            const response = await fetch(ENDPOINT_URL, options);


            // Checks if response is ok and parses json from response

            if (!response.ok) {

                switch (response.status) {
                    case 401:
                        setUserToError("Username or password is incorrect");
                        break;
                    case 403:
                        setUserToError("You are not authorized to access this resource");
                        break;
                    case 429:
                        setUserToError("You're sending too many responses too quickly");
                        break;
                    default:
                        setUserToError();
                }

                return;

            };

            const responseJSON = await response.json();
            if (!responseJSON) throw new Error("Could not parse JSON from response");

            console.log(responseJSON.message);

            refreshCurrentUserInfo();

        } catch (error) {
            setUserToError();
        }

    }


    // useEffects

    useEffect(() => {
        refreshCurrentUserInfo();
    }, []);

    return (
        <UserContext.Provider value={{

            userContextState,
            userContextDispatch,

            login

        }}>
            {children}
        </UserContext.Provider>
    )

}