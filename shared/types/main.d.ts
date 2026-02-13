// -- == [[ USERS ]] == -- \\

export type User = {

    _id?: string;

    created_on: Date;
    username: string;
    password: string;
    created_tasks: Task[];

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