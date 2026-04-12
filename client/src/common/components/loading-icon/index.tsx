// -- == [[ IMPORTS ]] == -- \\

// CSS

import './loading-icon.css';


// Icons

import { AiOutlineLoading3Quarters } from "react-icons/ai"



// -- == [[ COMPONENTS ]] == -- \\

const LoadingIcon = () => {
    return (
        <div className="loading">
            <AiOutlineLoading3Quarters className='icon' />
        </div>
    )
}



// -- == [[ EXPORTS ]] == -- \\

export default LoadingIcon