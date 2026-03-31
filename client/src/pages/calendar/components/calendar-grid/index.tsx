// -- == [[ IMPORTS ]] == -- \\

// CSS

import './calendarGrid.css';


// Types

import type { CalendarLayout } from '@shared/types/main';


// Shared

import { getCalendarLayout } from '@shared/utils/dates.utils';


// Packages

import { useContext, useEffect, useState } from 'react';


// Contexts

import { CalendarContext } from '@contexts/calendar.context';
import DayBox from './components/day-box';



// -- == [[ COMPONENTS ]] == -- \\

const CalendarGrid = () => {

    const [calendarLayout, setCalendarLayout] = useState<CalendarLayout>([]);

    const { calendarContextState } = useContext(CalendarContext);


    // useEffect that runs when calendarContextState is updated

    useEffect(() => {

        // Checks if there is calendar data, and gets calLayout from it

        if (!calendarContextState.calendarData) return;
        const { year, month } = calendarContextState.calendarData;

        const calLayout = getCalendarLayout(year, month, calendarContextState.calendarData.tasks);


        // Sets calendarLayout to calLayout

        setCalendarLayout(calLayout);

    }, [JSON.stringify(calendarContextState)]);

    if (calendarContextState.loading) return <h1>LOADING</h1>;
    if (calendarContextState.error !== false) return;

    return (
        <main className="calendar-grid">

            <table className='grid'>

                <thead>
                    <tr>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                </thead>

                <tbody>

                    {calendarLayout.map((calendarLayoutRow, rowNum) => {

                        return (
                            <tr key={rowNum}>

                                {calendarLayoutRow.map((dayLayoutInfo, idx) => {

                                    return (
                                        <DayBox
                                            key={idx}
                                            date={dayLayoutInfo.date}
                                            tasks={dayLayoutInfo.tasks}
                                        />
                                    )
                                })}

                            </tr>
                        )

                    })}

                </tbody>

            </table>

        </main>
    )
}



// -- == [[ EXPORTS ]] == -- \\

export default CalendarGrid