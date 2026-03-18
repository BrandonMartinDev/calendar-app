// -- == [[ IMPORTS ]] == -- \\

// CSS

import './calendarPage.css';


// Packages

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';


// Contexts

import { UserContext } from '@contexts/user.context';
import { CalendarContextProvider } from '@contexts/calendar.context';


// Components

import CalendarTopbar from './components/topbar';



// -- == [[ COMPONENTS ]] == -- \\

const CalendarPage = () => {

    // Get navigation and userContextState

    const navigate = useNavigate();
    const { userContextState } = useContext(UserContext);


    // useEffect that runs whenever userContextState is updated

    useEffect(() => {

        // Navigate to /auth/signin if user is not logged in

        if (userContextState.error !== false) return;           // if theres an error
        if (userContextState.loading) return;                   // if user is loading
        if (userContextState.userData !== undefined) return;    // if there is user data

        navigate("/auth/signin");

    }, [JSON.stringify(userContextState)]);

    return (
        <CalendarContextProvider>
            <div className="page-wrapper calendar">

                <CalendarTopbar />

                <main className="calendar-wrapper">calendar wrapper</main>

                <aside className="todo-wrapper">todo wrapper</aside>

            </div>
        </CalendarContextProvider>
    )
}



// -- == [[ EXPORTS ]] == -- \\

export default CalendarPage