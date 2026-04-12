// -- == [[ IMPORTS ]] == -- \\

// Packages

import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router"



// Pages

import {

  SignInPage,
  SignUpPage,
  CalendarPage

} from "@pages/index";


// Contexts

import { UserContextProvider } from "@contexts/user.context";




// -- == [[ COMPONENTS ]] == -- \\

const RedirectComponent = () => {

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth/signin");
  }, []);

  return <></>;

}

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>

          <Route index element={<RedirectComponent />} />

          <Route path='auth'>
            <Route path="signin" element={<SignInPage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Route>

          <Route path="/calendar" element={<CalendarPage />} />

          <Route path="*" element={<RedirectComponent />} />

        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  )
}



// -- == [[ EXPORTS ]] == -- \\

export default App
