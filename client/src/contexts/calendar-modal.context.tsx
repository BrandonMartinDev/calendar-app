// -- == [[ IMPORTS ]] == -- \\

// Config

import { BACKEND_URL } from "@shared/config/settings.config";


// Types

import type { Task } from "@shared/types/main";


// Packages

import {
    createContext,
    useContext,
    useReducer,
    type PropsWithChildren
} from "react"


// Utils

import isValidTaskData from '@shared/utils/isValidTaskData.utils';
import { CalendarContext } from "./calendar.context";


// Components

import ViewTaskModal from "@common/components/modal/modals/view-task";
import CreateTaskModal from "@common/components/modal/modals/create-task";
import DeleteTaskModal from "@common/components/modal/modals/delete-task";
import EditTaskModal from "@common/components/modal/modals/edit-task";



// -- == [[ CONSTANTS ]] == -- \\

const ENDPOINT_URL: string = (`${BACKEND_URL}/api/v1/tasks`);

const OPTIONS: RequestInit = {

    credentials: "include",

    headers: {
        "Content-Type": "application/json"
    }

}



// -- == [[ REDUCERS ]] == -- \\

// Types

type CalendarModalType = "CREATE" | "DELETE" | "EDIT" | "VIEW";

type CalendarModalStateType = {

    loading: boolean;
    error: string | false;
    shownModal: CalendarModalType | false;

    selectedTaskData: Task;

}

type CalendarModalReducerAction = {

    type: "DISPLAY_MODAL"
    | "HIDE_MODAL"
    | "UPDATE_SELECTED_TASK_DATA"
    | "UPDATE_ENTIRE_STATE"
    | "LOADING_MODAL"
    | "ERROR_MODAL";

    payload?: CalendarModalStateType | CalendarModalType | Task | string

}



// Constants

const defaultCalendarModalContext: CalendarModalStateType = {

    loading: false,
    error: false,
    shownModal: false,

    selectedTaskData: {

        creator_id: "",

        created_on: new Date(),
        name: "",
        description: "",
        task_date: new Date(),
        completed: false,

    }

}



// Methods

const CalendarModalReducer = (prevState: CalendarModalStateType, action: CalendarModalReducerAction): CalendarModalStateType => {

    switch (action.type) {

        case "LOADING_MODAL":
            return {
                ...prevState,
                loading: true,
                error: false
            }


        case "ERROR_MODAL":
            return {
                ...prevState,
                loading: false,
                error: action.payload as string
            }


        case "DISPLAY_MODAL":
            return { ...prevState, shownModal: action.payload as CalendarModalType };

        case "HIDE_MODAL":
            return { ...prevState, shownModal: false };

        case "UPDATE_SELECTED_TASK_DATA":
            return {
                ...prevState,
                error: false,
                selectedTaskData: action.payload as Task
            }


        case "UPDATE_ENTIRE_STATE":
            return action.payload as CalendarModalStateType;

        default:
            throw new Error("action.type '" + action.type + "' is NOT valid");

    }

}



// -- == [[ CONTEXTS ]] == -- \\

type CalendarModalContextType = {

    calendarModalState: CalendarModalStateType;
    calendarModalDispatch: React.ActionDispatch<[action: CalendarModalReducerAction]>;
    resetSelectedTaskState: () => void;

    createTask: () => void;
    deleteSelectedTask: () => void;
    editSelectedTask: () => void;

}

export const CalendarModalContext = createContext<CalendarModalContextType>({

    calendarModalState: defaultCalendarModalContext,
    calendarModalDispatch: () => { },
    resetSelectedTaskState: () => { },

    createTask: () => { },
    deleteSelectedTask: () => { },
    editSelectedTask: () => { },

});



// -- == [[ PROVIDERS ]] == -- \\

const CalendarModalContextProvider = ({ children }: PropsWithChildren) => {

    const { refreshTasksForMonth } = useContext(CalendarContext);

    // State

    const [calendarModalState, calendarModalDispatch] = useReducer(CalendarModalReducer, defaultCalendarModalContext);


    // State Methods

    const resetState = () => {

        calendarModalDispatch({
            type: "UPDATE_ENTIRE_STATE",
            payload: defaultCalendarModalContext
        });

    }

    const resetSelectedTaskState = () => {

        calendarModalDispatch({
            type: "UPDATE_SELECTED_TASK_DATA",
            payload: defaultCalendarModalContext.selectedTaskData
        });

    }

    const hideModal = () => {
        calendarModalDispatch({ type: "HIDE_MODAL" });
    }

    const setModalStateToLoading = () => {
        calendarModalDispatch({ type: "LOADING_MODAL" });
    }

    const setModalStateToErrored = (errMsg: string = "Something went wrong") => {
        calendarModalDispatch({ type: "ERROR_MODAL", payload: errMsg });
    }


    // Backend methods

    const createTask = async () => {

        try {

            // Check if task data is valid

            const validTaskData = isValidTaskData(calendarModalState.selectedTaskData);
            if (!validTaskData) throw new Error("Not valid task data");


            // Set modal state to loading and prepare request

            setModalStateToLoading();

            const {
                name,
                description,
                task_date,
                completed
            } = calendarModalState.selectedTaskData;

            const options = OPTIONS;

            options.body = JSON.stringify({
                name: name,
                description: description,
                task_date: task_date,
                completed: completed
            });

            options.method = "POST";


            // Send request to backend and verify everything is ok

            const response = await fetch(ENDPOINT_URL, options);

            if (!response.ok) {

                switch (response.status) {

                    case 400:
                        setModalStateToErrored("Task was not in the valid format");
                        break;
                    case 429:
                        setModalStateToErrored("Slow down, please");
                        break;
                    default:
                        setModalStateToErrored();

                }

                return;

            };


            // If everything is ok then refresh tasks for month and hide modal

            refreshTasksForMonth();
            hideModal();
            resetState();

        } catch (error) {
            setModalStateToErrored();
        }

    }

    const deleteSelectedTask = async () => {

        try {

            // Check if task data is valid

            const validTaskData = isValidTaskData(calendarModalState.selectedTaskData);

            if (!validTaskData) {
                setModalStateToErrored("Not valid task data");
                return;
            };


            // Set modal state to loading and prepare request

            setModalStateToLoading();

            const url = (`${ENDPOINT_URL}/${calendarModalState.selectedTaskData._id}`);

            const options = OPTIONS;
            options.method = "DELETE";


            // Send request to backend and verify everything is ok

            const response = await fetch(url, options);

            if (!response.ok) {

                switch (response.status) {
                    case 429:
                        setModalStateToErrored("Slow down, please");
                        break;
                    default:
                        setModalStateToErrored();
                }

                return;

            };


            // If everything is ok then refresh tasks for month and hide modal

            refreshTasksForMonth();
            hideModal();
            resetState();

        } catch (error) {
            setModalStateToErrored();
        }

    }

    const editSelectedTask = async () => {

        try {

            // Check if task data is valid

            const validTaskData = isValidTaskData(calendarModalState.selectedTaskData);
            if (!validTaskData) throw new Error("Not valid task data");


            // Set modal state to loading and prepare request

            setModalStateToLoading();

            const {
                name,
                description,
                task_date,
                completed
            } = calendarModalState.selectedTaskData;

            const options = OPTIONS;

            options.body = JSON.stringify({
                name: name,
                description: description,
                task_date: task_date,
                completed: completed
            });

            options.method = "PUT";

            const url = (`${ENDPOINT_URL}/${calendarModalState.selectedTaskData._id}`)


            // Send request to backend and verify everything is ok

            const response = await fetch(url, options);

            if (!response.ok) {

                switch (response.status) {

                    case 400:
                        setModalStateToErrored("Task was not in the valid format");
                        break;
                    case 429:
                        setModalStateToErrored("Slow down, please");
                        break;
                    default:
                        setModalStateToErrored();

                }

                return;

            };


            // If everything is ok then refresh tasks for month and hide modal

            refreshTasksForMonth();
            hideModal();
            resetState();

        } catch (error) {
            setModalStateToErrored();
        }

    }

    return (
        <CalendarModalContext.Provider value={{

            calendarModalState,
            calendarModalDispatch,

            resetSelectedTaskState,

            createTask,
            deleteSelectedTask,
            editSelectedTask

        }}>

            <CreateTaskModal />
            <ViewTaskModal />
            <DeleteTaskModal />
            <EditTaskModal />

            {children}
        </CalendarModalContext.Provider>
    )
}



// -- == [[ exports ]] == -- \\

export default CalendarModalContextProvider