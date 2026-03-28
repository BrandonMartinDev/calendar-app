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



// -- == [[ COMPONENTS ]] == -- \\

type DayBoxProps = {
    date: Date;
    tasks: Task[]
}

const DayBox = ({ date, tasks }: DayBoxProps) => {

    // Get calendarContextState

    const { calendarContextState } = useContext(CalendarContext);


    // Set day box states

    const [grayedOut, setGrayedOut] = useState<boolean>(false);



    // TODO: ADD READ, CREATE, DELETE, EDIT TASK FUNCTIONALITY

    // useEffect that runs whenever calendarContextState is updated

    useEffect(() => {

        // Checks if calendarContextState exists, and gets month and year from it

        if (!calendarContextState) return;
        const { month, year } = calendarContextState.calendarData;


        // Sets if daybox is grayed out depending whether date (for daybox) is within month context

        setGrayedOut(!isDateWithinCurrentMonth(date, month, year));

    }, [date, JSON.stringify(calendarContextState)]);

    return (
        <td className={`daybox-wrapper ${grayedOut ? "grayed-out" : ""}`}>

            <p className='daynum'>{date.getDate()}</p>

            <ul className="tasklist">

                {tasks.map((taskInfo, idx) => {
                    return <TaskComponent key={idx} name={taskInfo.name} />;
                })}

                {!grayedOut && (
                    <li className='create-task'>
                        <FaCirclePlus className='icon' />
                    </li>
                )}

            </ul>

        </td>
    )
}



// -- == [[ EXPORTS ]] == -- \\

export default DayBox