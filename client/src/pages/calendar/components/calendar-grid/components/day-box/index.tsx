// -- == [[ IMPORTS ]] == -- \\

// CSS

import './dayBox.css';


// Types

import type { MonthNumber } from '@shared/types/main';


// Contexts

import { useContext, useEffect, useState } from 'react';
import { CalendarContext } from '@contexts/calendar.context';



// -- == [[ METHODS ]] == -- \\

const isDateWithinCurrentMonth = (date: Date, month: MonthNumber, year: number) => {
    return (date.getMonth() === month) && (date.getFullYear() === year);
}



// -- == [[ COMPONENTS ]] == -- \\

type DayBoxProps = {
    date: Date;
}

const DayBox = ({ date }: DayBoxProps) => {

    const [grayedOut, setGrayedOut] = useState<boolean>(false);
    const { calendarContextState } = useContext(CalendarContext);

    useEffect(() => {

        if (!calendarContextState) return;
        const { month, year } = calendarContextState.calendarData;

        setGrayedOut(!isDateWithinCurrentMonth(date, month, year));

    }, [date, JSON.stringify(calendarContextState)]);

    return (
        <td className={`daybox-wrapper ${grayedOut ? "grayed-out" : ""}`}>
            <p className='daynum'>{date.getDate()}</p>
        </td>
    )
}



// -- == [[ EXPORTS ]] == -- \\

export default DayBox