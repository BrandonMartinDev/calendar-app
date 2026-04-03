// -- == [[ IMPORTS ]] == -- \\

// CSS

import './view-task-modal.css';


// Packages

import { useContext } from 'react';


// Components

import Modal from '../..';


// Contexts

import { CalendarModalContext } from '@contexts/calendar-modal.context';


// Icons

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosWarning } from 'react-icons/io';
import { LuSquareCheckBig } from "react-icons/lu";



// -- == [[ COMPONENTS ]] == -- \\

const ViewTaskModalLoading = () => {

    return (
        <Modal className='view'>

            <h3>View Task</h3>

            <div className='loading'>
                <AiOutlineLoading3Quarters className='icon' />
            </div>

        </Modal>
    )

}

const ViewTaskModal = () => {

    // Get calendar modal state

    const {

        calendarModalState,
        calendarModalDispatch,

        resetSelectedTaskState

    } = useContext(CalendarModalContext);

    const { name, description, task_date, completed } = calendarModalState.selectedTaskData;


    // OnClick methods

    const onCancelClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        e.preventDefault();
        calendarModalDispatch({ type: "HIDE_MODAL" });
        resetSelectedTaskState();

    }

    const onEditClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        e.preventDefault();

    }

    const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        e.preventDefault();

        calendarModalDispatch({
            type: "DISPLAY_MODAL",
            payload: "DELETE"
        })

    }


    // Check currently shown calendar modal is "VIEW", 
    // if not then just return nothing
    if (calendarModalState.shownModal !== "VIEW") return;
    if (calendarModalState.loading) return <ViewTaskModalLoading />;

    // TODO: 
    // show view modal when task is clicked
    // have view modal show selected task's info
    // have edit and delete buttons

    return (
        <Modal className={`view ${completed ? "completed" : ""}`}>

            <h3>{completed ? "View Completed Task" : "View Task"}</h3>

            <div className="task-info">

                <p><strong>{name || "N/A"}</strong></p>
                <p>{description || "N/A"}</p>

                <div className="bottom">

                    {completed && (
                        <div className="completed">
                            <small>Marked as Completed</small>
                            <LuSquareCheckBig className='icon' />
                        </div>
                    )}

                    <small><i>{new Date(task_date).toLocaleDateString()}</i></small>

                </div>

            </div>

            {calendarModalState.error && (
                <div className="error">
                    <IoIosWarning />
                    <p>{calendarModalState.error}</p>
                </div>
            )}

            <div className="choice-wrapper">

                <button
                    className='edit'
                    onClick={onEditClick}
                >Edit</button>

                <button
                    className='delete'
                    onClick={onDeleteClick}
                >Delete</button>

                <button
                    className='cancel'
                    onClick={onCancelClick}
                >Close</button>

            </div>

        </Modal>
    )
}



// -- == [[ EXPORTS ]] == -- \\

export default ViewTaskModal;