// -- == [[ IMPORTS ]] == -- \\

// CSS

import './create-task-modal.css';


// Components

import Modal from '../..';
import ModalInputBox from '@common/components/modal-input-box';
import { useReducer } from 'react';


// -- == [[ REDUCERS ]] == -- \\

// Types

type TaskModalState = {

    name: string;
    description: string;
    date: Date;
    completed: boolean;

}

type TaskModalReducerAction = {

    type: "NAME" | "DESCRIPTION" | "DATE" | "COMPLETED";
    payload: string | Date | boolean;

}


// Constants

const defaultCreateTaskModal: TaskModalState = {

    name: "",
    description: "",
    date: new Date(),
    completed: false,

}


// Methods

const CreateTaskModalReducer = (prevState: TaskModalState, action: TaskModalReducerAction): TaskModalState => {

    switch (action.type) {

        case "NAME":
            return { ...prevState, name: action.payload as string }
        case "DESCRIPTION":
            return { ...prevState, description: action.payload as string }
        case "DATE":
            return { ...prevState, date: action.payload as Date }
        case "COMPLETED":
            return { ...prevState, completed: action.payload as boolean }

        default:
            throw new Error("action.type '" + action.type + "' is NOT valid!");

    }

}



// -- == [[ COMPONENTS ]] == -- \\

const CreateTaskModal = () => {

    // Set up create task modal reducer state

    const [createTaskModalState, setCreateTaskModalState] = useReducer(CreateTaskModalReducer, defaultCreateTaskModal);


    // OnChange Methods

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {

        setCreateTaskModalState({
            type: "NAME",
            payload: e.target.value.toString()
        });

    }

    const onDescChange = (e: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>) => {

        setCreateTaskModalState({
            type: "DESCRIPTION",
            payload: e.target.value.toString()
        });

    }

    const onDateChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {

        const [year, month, date] = e.target.value.toString().split("-");

        const newDate = new Date(parseInt(year), (parseInt(month) - 1), parseInt(date));

        setCreateTaskModalState({
            type: "DATE",
            payload: newDate
        });

    }

    const onCompletedChange = () => {

        setCreateTaskModalState({
            type: "COMPLETED",
            payload: !createTaskModalState.completed
        });

    }


    // OnClick methods

    const onCancelClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        e.preventDefault();

    }

    const onSaveClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        e.preventDefault();

    }

    return (
        <Modal className='create'>

            <h3>Create Task</h3>

            <form>

                <ModalInputBox

                    type='text'
                    inputName='task-name'
                    labelText='Task Name:'

                    value={createTaskModalState.name}
                    onChange={onNameChange}

                />

                <ModalInputBox

                    type='textarea'
                    inputName='task-desc'
                    labelText='Task Description:'

                    value={createTaskModalState.description}
                    onChange={onDescChange}

                />

                <ModalInputBox

                    type='date'
                    inputName='task-date'
                    labelText='Task Date:'

                    value={createTaskModalState.date.toLocaleDateString("en-CA")}
                    onChange={onDateChange}

                />

                <ModalInputBox

                    type='checkbox'
                    inputName='task-completed'
                    labelText='Mark Task as Completed:'

                    value={createTaskModalState.completed}
                    onChange={onCompletedChange}

                />

            </form>

            <div className="choice-wrapper">

                <button
                    className='submit'
                    onClick={onSaveClick}
                >Save</button>

                <button
                    className='cancel'
                    onClick={onCancelClick}
                >Cancel</button>

            </div>

        </Modal>
    )
}



// -- == [[ EXPORTS ]] == -- \\

export default CreateTaskModal