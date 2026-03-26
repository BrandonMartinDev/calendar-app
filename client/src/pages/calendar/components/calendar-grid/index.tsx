// -- == [[ IMPORTS ]] == -- \\

// CSS

import './calendarGrid.css';


// Shared

import { getDaysInMonth, getFirstDateInMonth } from '@shared/utils/dates.utils';


// Packages

import { useContext, useEffect, useState } from 'react';


// Contexts

import { CalendarContext } from '@contexts/calendar.context';
import DayBox from './components/day-box';



// -- == [[ COMPONENTS ]] == -- \\

type CalendarLayoutRow = Date[];
type CalendarLayout = CalendarLayoutRow[];

const CalendarGrid = () => {

    const [calendarLayout, setCalendarLayout] = useState<CalendarLayout>([]);

    const { calendarContextState } = useContext(CalendarContext);


    // useEffect that runs when calendarContextState is updated

    useEffect(() => {

        // Checks if there is calendar data, and gets year and month from it

        if (!calendarContextState.calendarData) return;
        const { year, month } = calendarContextState.calendarData;


        // Gets daysInMonth, startFillerDays from year and month

        const daysInMonth = getDaysInMonth(year, month);
        const startFillerDays = getFirstDateInMonth(year, month).getDay(); // 0-6


        // Loop that runs through 0 - days in month and filler days combined
        // Each calendar layout row will have 7 elements corresponding to a day of the week

        let calLayout: CalendarLayout = [];
        let calLayoutRow: CalendarLayoutRow = [];

        for (let i = 0; i < daysInMonth; i++) {


            // If it is the first day, inserts startFillerDays to the row first

            if (i === 0) {

                for (let j = startFillerDays; j > 0; j--) {
                    const fillerDate = new Date(year, month, (-j) + 1);
                    calLayoutRow.push(fillerDate);
                }

            }


            // Insert day of month for row

            const date = new Date(year, month, i + 1);

            calLayoutRow.push(date);


            // If it is a full row (7 days), then
            // push current calLayoutRow to calLayout and reset calLayoutRow

            if (calLayoutRow.length === 7) {
                calLayout.push(calLayoutRow);
                calLayoutRow = [];
            }

        }


        // If current calLayoutRow is not completely filled or empty, adds end filler days

        if ((calLayoutRow.length !== 7) && (calLayoutRow.length !== 0)) {

            // Gets days left to fill row and loops through it

            const daysLeft = (7 - calLayoutRow.length);

            for (let j = 0; j < daysLeft; j++) {

                // Gets date from next month and j+1

                const date = new Date(year, month + 1, j + 1);
                calLayoutRow.push(date);

            }

            calLayout.push(calLayoutRow)
            calLayoutRow = [];

        }


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
                                {calendarLayoutRow.map((date, idx) => {
                                    return <DayBox key={idx} date={date} />
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