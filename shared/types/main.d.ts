// -- == [[ TIME ]] == -- \\

const dayNums = [0, 1, 2, 3, 4, 5, 6] as const;
const monthNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;

export type DayNumber = (typeof dayNums)[number];
export type MonthNumber = (typeof monthNums)[number];



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