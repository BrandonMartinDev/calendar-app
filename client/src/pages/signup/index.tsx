// -- == [[ IMPORTS ]] == -- \\

// CSS

import "./signup.css";


// Packages

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";


// Contexts

import { UserContext } from "@contexts/user.context";



// -- == [[ COMPONENTS ]] == -- \\

const SignUpPage = () => {

    // Get useNavigate from react router

    const navigate = useNavigate();


    // Initialize form state    

    const [formUser, setFormUser] = useState<string>("");
    const [formPass, setFormPass] = useState<string>("");


    // Get stuff from user context

    const {
        userContextState,
        signup
    } = useContext(UserContext);


    // Form submit method

    const onFormSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        signup(formUser, formPass);
    }


    // useEffect that runs whenever userContextState is updated

    useEffect(() => {

        // Checks if userContextState is either loading, errored, or does not have userData
        // Otherwise it will redirect to /calendar

        if (userContextState.loading || userContextState.error || !userContextState.userData) return;
        navigate("/calendar");

    }, [JSON.stringify(userContextState)]);

    return (
        <div className="page-wrapper signup">
            <main>

                <h2>Plan-It</h2>
                <h4>Sign Up</h4>

                <form className="auth-wrapper">

                    <div className="inputs">

                        <div className="input-box">

                            <label htmlFor="username">New Username</label>

                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formUser}
                                onChange={(e) => {
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
                                    setFormPass(e.target.value);
                                }}
                            />

                        </div>

                    </div>

                    <div className="bottom">
                        <span><Link to='/auth/signin'>Already have an account?</Link></span>

                        <button
                            type="submit"
                            onClick={onFormSubmit}
                        >Sign Up</button>

                    </div>

                </form>

            </main>
        </div>
    )
}



// -- == [[ EXPORTS ]] == -- \\

export default SignUpPage;