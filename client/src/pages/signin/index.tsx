// -- == [[ IMPORTS ]] == -- \\

// CSS

import "./signin.css";


// Packages

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";


// Contexts

import { UserContext } from "@contexts/user.context";


// Icons

import { FaInfoCircle } from "react-icons/fa";


// Components

import LoadingIcon from "@common/components/loading-icon";



// -- == [[ COMPONENTS ]] == -- \\

const Loading = () => {

    return (
        <div className="page-wrapper signin">
            <main>

                <h2>Plan-It</h2>
                <h4>Log In</h4>

                <div className="loading-message">
                    <p>Logging In...</p>
                    <LoadingIcon />
                </div>

            </main>
        </div>
    )

}

type ErrorComponentProps = {
    errMsg: string
}

const Error = ({ errMsg }: ErrorComponentProps) => {

    return (
        <div className="error">
            <FaInfoCircle />
            <p>{errMsg}</p>
        </div>
    )

}

const SignInPage = () => {

    // Get useNavigate from react router

    const navigate = useNavigate();


    // Initialize form state    

    const [formUser, setFormUser] = useState<string>("");
    const [formPass, setFormPass] = useState<string>("");


    // Get stuff from user context

    const {
        userContextState,
        userContextDispatch,
        login
    } = useContext(UserContext);


    // Form inputs onchange method

    const onFormChange = () => {
        userContextDispatch({
            type: "ERROR_UPDATE",
            payload: false
        });
    }


    // Form submit method

    const onFormSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        login(formUser, formPass);
    }


    // useEffect that runs whenever userContextState is updated

    useEffect(() => {

        // Checks if userContextState is either loading, errored, or does not have userData
        // Otherwise it will redirect to /calendar

        if (userContextState.loading || userContextState.error || !userContextState.userData) return;
        navigate("/calendar");

    }, [JSON.stringify(userContextState)]);


    // useEffect that runs whenever user navigates to signin screen

    useEffect(() => {
        userContextDispatch({
            type: "ERROR_UPDATE",
            payload: false
        });
    }, []);

    if (userContextState.loading) return <Loading />;

    return (
        <div className="page-wrapper signin">
            <main>

                <h2>Plan-It</h2>
                <h4>Log In</h4>

                <form className="auth-wrapper">

                    <div className="inputs">

                        {userContextState.error !== false && <Error errMsg={userContextState.error} />}

                        <div className="input-box">

                            <label htmlFor="username">Username</label>

                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formUser}
                                onChange={(e) => {
                                    onFormChange();
                                    setFormUser(e.target.value);
                                }}
                            />

                        </div>

                        <div className="input-box">

                            <label htmlFor="">Password</label>

                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formPass}
                                onChange={(e) => {
                                    onFormChange();
                                    setFormPass(e.target.value);
                                }}
                            />

                        </div>

                    </div>

                    <div className="bottom">
                        <span><Link to='/auth/signup'>Create new account</Link></span>

                        <button
                            type="submit"
                            onClick={onFormSubmit}
                        >Log in</button>

                    </div>

                </form>

            </main>
        </div>
    )
}



// -- == [[ EXPORTS ]] == -- \\

export default SignInPage;