// -- == [[ USERS ]] == -- \\

export type User = {

    account_id: "FIXME";
    created_on: Date;
    username: string;
    password: string;
    created_tasks: "FIXME"[];

}



// -- == [[ TASKS ]] == -- \\

export type Task = {

    task_id: "FIXME";
    creator_id: "FIXME";
    created_on: Date;

    name: string;
    description?: string;
    task_date: Date;
    completed: boolean | undefined;

}