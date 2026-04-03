// -- == [[ IMPORTS ]] == -- \\

// CSS

import { useContext } from 'react';
import './task.css';


// Types

import type { Task } from '@shared/types/main';
import { CalendarModalContext } from '@contexts/calendar-modal.context';



// -- == [[ COMPONENTS ]] == -- \\

type TaskProps = {
    taskInfo: Task
}

const TaskComponent = ({ taskInfo }: TaskProps) => {

    // Gets dispatch from context

    const { calendarModalDispatch } = useContext(CalendarModalContext);


    // Method

    const onTaskClick = () => {

        // Updates selected task data with current task info and displays view modal

        calendarModalDispatch({
            type: "UPDATE_SELECTED_TASK_DATA",
            payload: taskInfo
        });

        calendarModalDispatch({
            type: "DISPLAY_MODAL",
            payload: "VIEW"
        });

    }

    return (
        <li
            className={`task ${taskInfo.completed ? "completed" : ""}`}
            onClick={onTaskClick}
        >{taskInfo.name}</li>
    );
}



// -- == [[ EXPORTS ]] == -- \\

export default TaskComponent