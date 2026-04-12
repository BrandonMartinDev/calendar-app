// -- == [[ IMPORTS ]] == -- \\

// CSS

import './month-picker.css';


// Images

import {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
} from "@assets/months";

const monthImages = [
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
] as const;



// Types

import type { MonthNumber } from '@shared/types/main';


// Packages

import { useContext, useEffect, useState } from 'react';


// Contexts

import { CalendarContext } from '@contexts/calendar.context';


// Components

import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";



// -- == [[ COMPONENTS ]] == -- \\

const CalendarMonthPicker = () => {

    // Set state

    const [timeDisplay, setTimeDisplay] = useState<string>("Loading");
    const [backgroundImage, setBackgroundImage] = useState<string>(January);


    // Get contexts
    const { calendarContextState, calendarContextDispatch } = useContext(CalendarContext);


    // useEffect that runs whenever calendarData is updated

    useEffect(() => {

        if (calendarContextState.calendarData) {

            // Get month and year from calendar context and create date object from it

            const { month, year } = calendarContextState.calendarData;
            const newDate = new Date(`${month + 1}/1/${year}`);


            // Create new time display string from date, and set timeDisplay state

            const monthString = newDate.toLocaleString("default", { month: "long" })
            let newTimeDisplay = monthString + ", " + year.toString();

            setTimeDisplay(newTimeDisplay);


            // Set background image state for current month

            setBackgroundImage(monthImages[month]);

        } else {
            setTimeDisplay("loading...");
        }


    }, [JSON.stringify(calendarContextState.calendarData)]);


    // Methods

    const onTodayClick = () => {

        if (!calendarContextState.calendarData) return;


        // Gets today's date

        const newDate = new Date();


        // Set calendar state

        calendarContextDispatch({
            type: "CALENDAR_DATA_UPDATE",
            payload: {
                ...calendarContextState.calendarData,
                month: newDate.getMonth() as MonthNumber,
                year: newDate.getFullYear(),
            }
        });

    }

    const onPreviousMonthClick = () => {

        if (!calendarContextState.calendarData) return;


        // Gets month and year from context state and substracts 1 from month

        const { month, year } = calendarContextState.calendarData;

        let newMonthNumber: MonthNumber = (month - 1) as MonthNumber;
        let newYearNumber = year;


        // Checks if new month number is less than 0
        // If it is, goes to last month of previous year

        if (newMonthNumber < 0) {
            newMonthNumber = 11;
            newYearNumber -= 1;
        }


        // Sets calendar state

        calendarContextDispatch({
            type: "CALENDAR_DATA_UPDATE",
            payload: {
                ...calendarContextState.calendarData,
                month: newMonthNumber,
                year: newYearNumber
            }
        });

    }

    const onNextMonthClick = () => {

        if (!calendarContextState.calendarData) return;


        // Gets month and year from context state and substracts 1 from month

        const { month, year } = calendarContextState.calendarData;

        let newMonthNumber: MonthNumber = (month + 1) as MonthNumber;
        let newYearNumber = year;


        // Checks if new month number is greater than 11
        // If it is, goes to first month of next year

        if (newMonthNumber > 11) {
            newMonthNumber = 0;
            newYearNumber += 1;
        }


        // Sets calendar state

        calendarContextDispatch({
            type: "CALENDAR_DATA_UPDATE",
            payload: {
                ...calendarContextState.calendarData,
                month: newMonthNumber,
                year: newYearNumber
            }
        });

    }

    return (
        <div className="month-picker">

            <img src={backgroundImage} alt="month img" />

            <button
                className="today-button"
                onClick={onTodayClick}
            > Today</button >

            <div className="month-displayer">

                <button
                    className="previous"
                    onClick={onPreviousMonthClick}
                >
                    <FaArrowCircleLeft />
                </button>

                <h2 className="month-name">{timeDisplay}</h2>

                <button
                    className="next"
                    onClick={onNextMonthClick}
                >
                    <FaArrowCircleRight />
                </button>

            </div>

        </div>
    )
}



// -- == [[ EXPORTS ]] == -- \\

export default CalendarMonthPicker