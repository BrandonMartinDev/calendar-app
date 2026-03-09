// -- == [[ IMPORTS ]] == -- \\

// CSS

import { Link } from "react-router";
import "./signin.css";



// -- == [[ COMPONENTS ]] == -- \\

const SignInPage = () => {
    return (
        <div className="page-wrapper signin">
            <main>

                <h2>Plan-It</h2>

                <form action="" className="auth-wrapper">

                    <div className="inputs">

                        <div className="input-box">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" />
                        </div>

                        <div className="input-box">
                            <label htmlFor="">Password</label>
                            <input type="password" id="password" name="password" />
                        </div>

                    </div>

                    <div className="bottom">
                        <span><Link to='/auth/signup'>Create new account</Link></span>
                        <button type="submit">Sign In</button>
                    </div>

                </form>

            </main>
        </div>
    )
}



// -- == [[ EXPORTS ]] == -- \\

export default SignInPage