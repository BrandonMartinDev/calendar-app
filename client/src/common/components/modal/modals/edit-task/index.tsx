// -- == [[ IMPORTS ]] == -- \\

// CSS

import './edit-task-modal.css';


// Packages

import { useContext } from 'react';


// Components

import Modal from '../..';
import ModalInputBox from '@common/components/modal-input-box';


// Contexts

import { CalendarModalContext } from '@contexts/calendar-modal.context';


// Icons

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosWarning } from 'react-icons/io';



// -- == [[ COMPONENTS ]] == -- \\

const EditTaskModalLoading = () => {

    return (
        <Modal className='edit'>

            <h3>New Task</h3>

            <div className='loading'>
                <AiOutlineLoading3Quarters className='icon' />
            </div>

        </Modal>
    )

}

const EditTaskModal = () => {

    // Get calendar modal state

    const {

        calendarModalState,
        calendarModalDispatch,

        editSelectedTask

    } = useContext(CalendarModalContext);


    // OnChange Methods

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {

        calendarModalDispatch({

            type: "UPDATE_SELECTED_TASK_DATA",

            payload: {
                ...calendarModalState.selectedTaskData,
                name: e.target.value
            }

        });

    }

    const onDescChange = (e: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>) => {

        calendarModalDispatch({

            type: "UPDATE_SELECTED_TASK_DATA",

            payload: {
                ...calendarModalState.selectedTaskData,
                description: e.target.value
            }

        });

    }

    const onDateChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {

        const [year, month, date] = e.target.value.toString().split("-");

        const newDate = new Date(parseInt(year), (parseInt(month) - 1), parseInt(date));

        calendarModalDispatch({

            type: "UPDATE_SELECTED_TASK_DATA",

            payload: {
                ...calendarModalState.selectedTaskData,
                task_date: newDate
            }

        });

    }

    const onCompletedChange = () => {

        calendarModalDispatch({

            type: "UPDATE_SELECTED_TASK_DATA",

            payload: {
                ...calendarModalState.selectedTaskData,
                completed: !calendarModalState.selectedTaskData.completed
            }

        });

    }


    // OnClick methods

    const onCancelClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        e.preventDefault();
        calendarModalDispatch({ type: "HIDE_MODAL" });

    }

    const onSaveClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        e.preventDefault();
        editSelectedTask();

    }


    // Check currently shown calendar modal is "EDIT", 
    // if not then just return nothing
    if (calendarModalState.shownModal !== "EDIT") return;
    if (calendarModalState.loading) return <EditTaskModalLoading />;

    return (
        <Modal className='edit'>

            <h3>Edit Task</h3>

            <form>

                <ModalInputBox

                    type='text'
                    inputName='task-name'
                    labelText='Task Name:'

                    value={calendarModalState.selectedTaskData.name}
                    onChange={onNameChange}

                />

                <ModalInputBox

                    type='textarea'
                    inputName='task-desc'
                    labelText='Task Description:'

                    value={calendarModalState.selectedTaskData.description || ""}
                    onChange={onDescChange}

                />

                <ModalInputBox

                    type='date'
                    inputName='task-date'
                    labelText='Task Date:'

                    value={new Date(calendarModalState.selectedTaskData.task_date).toLocaleDateString("en-CA")}
                    onChange={onDateChange}

                />

                <ModalInputBox

                    type='checkbox'
                    inputName='task-completed'
                    labelText='Mark Task as Completed:'

                    value={calendarModalState.selectedTaskData.completed}
                    onChange={onCompletedChange}

                />

            </form>

            {calendarModalState.error && (
                <div className="error">
                    <IoIosWarning />
                    <p>{calendarModalState.error}</p>
                </div>
            )}

            <div className="choice-wrapper">

                <button
                    className='submit'
                    onClick={onSaveClick}
                >Save Edit</button>

                <button
                    className='cancel'
                    onClick={onCancelClick}
                >Cancel</button>

            </div>

        </Modal>
    )
}



// -- == [[ EXPORTS ]] == -- \\

export default EditTaskModal;