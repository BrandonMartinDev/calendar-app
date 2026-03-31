// -- == [[ IMPORTS ]] == -- \\

// CSS

import './task.css';


// Types

import type { Task } from '@shared/types/main';



// -- == [[ COMPONENTS ]] == -- \\

type TaskProps = {
    taskInfo: Task
}

const TaskComponent = ({ taskInfo }: TaskProps) => {
    return (
        <li
            className={`task ${taskInfo.completed ? "completed" : ""}`}
        >{taskInfo.name}</li>
    );
}



// -- == [[ EXPORTS ]] == -- \\

export default TaskComponent