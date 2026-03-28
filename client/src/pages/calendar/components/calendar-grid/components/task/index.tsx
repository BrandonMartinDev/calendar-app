// -- == [[ IMPORTS ]] == -- \\

// CSS

import './task.css';



// -- == [[ COMPONENTS ]] == -- \\

type TaskProps = {
    name: string;
}

const Task = ({ name }: TaskProps) => {
    return <li className='task'>{name}</li>;
}



// -- == [[ EXPORTS ]] == -- \\

export default Task