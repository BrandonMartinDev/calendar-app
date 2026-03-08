// -- == [[ IMPORTS ]] == -- \\

// Packages
import { BrowserRouter, Routes, Route, useNavigate } from "react-router"



// Pages

import SignInPage from "./pages/signin"
import { useEffect } from "react";



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
    <BrowserRouter>
      <Routes>

        <Route index element={<RedirectComponent />} />

        <Route path='auth'>
          <Route path="signin" element={<SignInPage />} />
          {/* <Route path="/signup" element={<SignInPage />} /> */}
        </Route>

        <Route path="*" element={<RedirectComponent />} />

      </Routes>
    </BrowserRouter>
  )
}



// -- == [[ EXPORTS ]] == -- \\

export default App
