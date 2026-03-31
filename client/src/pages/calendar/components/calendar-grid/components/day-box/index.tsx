// -- == [[ IMPORTS ]] == -- \\

// CSS
import './dayBox.css';


// Types
import type { Task } from '@shared/types/main';


// Contexts

import { useContext, useEffect, useState } from 'react';
import { CalendarContext } from '@contexts/calendar.context';


// Utils
import { isDateWithinCurrentMonth } from '@shared/utils/dates.utils';


// Icons
import { FaCirclePlus } from "react-icons/fa6";


// Components

import TaskComponent from '../task';
import { CalendarModalContext } from '@contexts/calendar-modal.context';



// -- == [[ COMPONENTS ]] == -- \\

type DayBoxProps = {
    date: Date;
    tasks: Task[]
}

const DayBox = ({ date, tasks }: DayBoxProps) => {

    // Get calendarContextState

    const { calendarContextState } = useContext(CalendarContext);
    const { calendarModalState, calendarModalDispatch, resetSelectedTaskState } = useContext(CalendarModalContext);


    // Set day box states

    const [grayedOut, setGrayedOut] = useState<boolean>(false);
    const [isToday, setIsToday] = useState<boolean>(false);



    // TODO: ADD READ, CREATE, DELETE, EDIT TASK FUNCTIONALITY

    // useEffect that runs whenever calendarContextState is updated

    useEffect(() => {

        // Checks if calendarContextState exists, and gets month and year from it

        if (!calendarContextState) return;
        const { month, year } = calendarContextState.calendarData;


        // Sets if daybox is grayed out depending whether date (for daybox) is within month context

        setGrayedOut(!isDateWithinCurrentMonth(date, month, year));


        // Sets if the daybox day is the current day

        const todayDate = new Date();

        setIsToday(todayDate.getDate() === date.getDate() && todayDate.getMonth() === month && todayDate.getFullYear() === year);

    }, [date, JSON.stringify(calendarContextState)]);



    // Methods

    const onCreateTaskClick = () => {

        // Reset task state to default
        resetSelectedTaskState();


        // Set selected task's task_date to daybox date

        calendarModalDispatch({

            type: "UPDATE_SELECTED_TASK_DATA",

            payload: {
                ...calendarModalState.selectedTaskData,
                task_date: date
            }

        });


        // Show modal

        calendarModalDispatch({
            type: "DISPLAY_MODAL",
            payload: "CREATE"
        });

    }

    return (
        <td className={`daybox-wrapper ${grayedOut ? "grayed-out" : ""}`}>

            <p className='daynum'>
                {isToday
                    ? <strong>{date.getDate()}</strong>
                    : date.getDate()}
            </p>

            <ul className="tasklist">

                {tasks.map((taskInfo, idx) => {
                    return (
                        <TaskComponent
                            key={idx}
                            taskInfo={taskInfo}
                        />
                    );
                })}

                {!grayedOut && (
                    <li
                        className='create-task'
                        onClick={onCreateTaskClick}
                    >
                        <FaCirclePlus className='icon' />
                    </li>
                )}

            </ul>

        </td>
    )
}



// -- == [[ EXPORTS ]] == -- \\

export default DayBox