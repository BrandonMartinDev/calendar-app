// -- == [[ IMPORTS ]] == -- \\

// CSS

import './topbar.css';


// Packages

import { useContext } from 'react';


// Contexts

import { UserContext } from '@contexts/user.context';


// Icons

import { IoLogOutOutline } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";


// Components

import LoadingIcon from '@common/components/loading-icon';



// -- == [[ COMPONENTS ]] == -- \\

const Loading = () => {

    return (
        <header>
            <LoadingIcon />
        </header>
    )

}

const CalendarTopbar = () => {

    // Get user context

    const { userContextState, logout } = useContext(UserContext);
    if (!userContextState.userData) return <Loading />;


    // Methods

    const onLogoutClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        e.preventDefault();
        logout();

    }

    return (
        <header>
            <p>{userContextState.userData.username}</p>

            <button
                className='logout'
                onClick={onLogoutClick}
            >

                <span>logout</span>

                <IoLogOutOutline className='icon-outline' />
                <IoLogOut className='icon' />

            </button>

        </header>
    )
}



// -- == [[ EXPORTS ]] == -- \\

export default CalendarTopbar