// -- == [[ IMPORTS ]] == -- \\

// Types

import type {
    CalendarDateLayout,
    CalendarLayout,
    CalendarLayoutRow,
    DayNumber,
    MonthNumber,
    Task
} from "@shared/types/main";



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

const getCalendarLayout = (year: number, month: MonthNumber, tasks: Task[] = []) => {

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

                // gets filler date by adding 1 to the negative j days before the first day
                // I'm bad at explaining complex things, but basically
                // Say 1st day of month lands on tuesday (2). That means there should be 2 "filler days"
                // before 1st day of month (sunday and monday)

                const fillerDate = new Date(year, month, (-j) + 1);

                const fillerDateLayout: CalendarDateLayout = {

                    date: fillerDate,
                    tasks: []

                }

                calLayoutRow.push(fillerDateLayout);

            }

        }


        // Get day of month and tasks for the day

        const dayOfTheMonth = new Date(year, month, i + 1);

        const tasksForDate = tasks.filter((taskInfo: Task) => {

            // Filters through calendarData.tasks

            const year = dayOfTheMonth.getFullYear();
            const month = dayOfTheMonth.getMonth();
            const date = dayOfTheMonth.getDate();

            const task_year = new Date(taskInfo.task_date).getFullYear();
            const task_month = new Date(taskInfo.task_date).getMonth();
            const task_date = new Date(taskInfo.task_date).getDate();


            // Compares the task's date and the dayOfTheMonth date

            return (year === task_year) && (month === task_month) && (date === task_date);

        });


        // Add dayLayout to row

        calLayoutRow.push({
            date: dayOfTheMonth,
            tasks: tasksForDate
        });


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

            const fillerDate = new Date(year, month + 1, j + 1);
            calLayoutRow.push({
                date: fillerDate,
                tasks: []
            });

        }

        calLayout.push(calLayoutRow)
        calLayoutRow = [];

    }

    return calLayout;

}


// -- == [[ EXPORTS ]] == -- \\

export {

    getDayString,
    getFirstDateInMonth,
    getLastDateInMonth,
    getDaysInMonth,
    isDateWithinCurrentMonth,

    getCalendarLayout

}