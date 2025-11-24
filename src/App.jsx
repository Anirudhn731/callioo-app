import { Route, Routes, BrowserRouter, useNavigate } from "react-router";

import './App.css'
import NavBar from './Components/NavBar/NavBar'
import LoginPage from "./Pages/Login/LoginPage";
import SignUpPage from "./Pages/SignUp/SignUpPage";
import Main from "./Pages/Main/Main";
import { useRef } from "react";
import UpdateProfile from "./Pages/UpdateProfile/UpdateProfile";

function App() {
  const socketRef = useRef(null);
  const navigate = useNavigate();

  function logout(socketRef, navigate) {
    localStorage.removeItem("jwt");
    socketRef?.current?.close();
    navigate("/");
    console.log("Logged out...");
  }

  return (
    <>
      <NavBar />
      <Routes>
        {/* No Authentication Required */}
        <Route path="/" element={<LoginPage socketRef={socketRef} />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* Authentication Required */}
        <Route path="/main" element={<Main socketRef={socketRef} logout={() => logout(socketRef, navigate)} />} />
        <Route path="/updateProfile" element={<UpdateProfile socketRef={socketRef} logout={() => logout(socketRef, navigate)} />} />

      </Routes>
    </>
  )
}

export default App
