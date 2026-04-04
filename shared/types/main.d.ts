// -- == [[ TIME ]] == -- \\

export type DayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type MonthNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;



// -- == [[ USERS ]] == -- \\

export type User = {

    _id?: string;

    created_on: Date;
    username: string;
    password: string;
    created_tasks: (Task | string)[];

}



// -- == [[ TASKS ]] == -- \\

export type Task = {

    _id?: string;

    creator_id: User | string;
    created_on: Date;

    name: string;
    description?: string;
    task_date: Date;
    completed: boolean;

}



// -- == [[ CALENDAR LAYOUT ]] == -- \\

export type CalendarDateLayout = {
    date: Date;
    tasks: Task[];
}

export type CalendarLayoutRow = CalendarDateLayout[];
export type CalendarLayout = CalendarLayoutRow[];