// -- == [[ IMPORTS ]] == -- \\

// Types

import type { DayNumber, MonthNumber } from "@shared/types/main";



// -- == [[ METHODS ]] == -- \\

const getDayString = (day: DayNumber) => {

    switch (day) {

        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";

    }

}

const getFirstDateInMonth = (year: number, month: MonthNumber) => {
    return new Date(year, month, 1);
}

const getLastDateInMonth = (year: number, month: MonthNumber) => {
    return new Date(year, month + 1, 0);
}

const getDaysInMonth = (year: number, month: MonthNumber) => {
    return new Date(year, month + 1, 0).getDate();
}

const isDateWithinCurrentMonth = (date: Date, month: MonthNumber, year: number) => {
    return (date.getMonth() === month) && (date.getFullYear() === year);
}


// -- == [[ EXPORTS ]] == -- \\

export {

    getDayString,
    getFirstDateInMonth,
    getLastDateInMonth,
    getDaysInMonth,
    isDateWithinCurrentMonth

}