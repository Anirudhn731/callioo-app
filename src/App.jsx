import { Route, Routes, BrowserRouter, useNavigate } from "react-router";

import './App.css'
import NavBar from './Components/NavBar/NavBar'
import LoginPage from "./Pages/Login/LoginPage";
import SignUpPage from "./Pages/SignUp/SignUpPage";
import Main from "./Pages/Main/Main";
import { useRef, useState } from "react";
import UpdateProfile from "./Pages/UpdateProfile/UpdateProfile";
import Meeting from "./Pages/Meeting/Meeting";
import ScheduleMeeting from "./Pages/ScheduleMeeting/ScheduleMeeting";

function App() {
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [retrievedSchedule, SetRetrievedSchedule] = useState({
    emails: [localStorage.getItem("email"),],
    meetingRoomId: "",
    createdByEmail: localStorage.getItem("email"),
    startDate: "",
    endDate: "",
    startTime: "",
    everyMonday: false,
    everyTuesday: false,
    everyWednesday: false,
    everyThursday: false,
    everyFriday: false,
    everySaturday: false,
    everySunday: false,
  });

  function logout(socketRef, navigate) {
    localStorage.clear();
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
        <Route path="/main" element={<Main socketRef={socketRef} logout={() => logout(socketRef, navigate)} schedules={schedules} setSchedules={setSchedules} SetRetrievedSchedule={SetRetrievedSchedule} />} />
        <Route path="/updateProfile" element={<UpdateProfile socketRef={socketRef} logout={() => logout(socketRef, navigate)} />} />
        <Route path="/meeting/*" element={<Meeting />} />
        <Route path="/scheduleMeeting/*" element={<ScheduleMeeting retrievedSchedule={retrievedSchedule} SetRetrievedSchedule={SetRetrievedSchedule} />} />
      </Routes>
    </>
  )
}

export default App
