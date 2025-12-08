import "./Main.css"

import ProfileSection from "./Components/ProfileSection.jsx";
import MeetingDashboard from "./Components/MeetingDashboard";
import MeetingHistory from "./Components/MeetingHistory.jsx";
import UpcomingMeetings from "./Components/UpcomingMeetings.jsx";
import ScheduleDashboard from "./Components/ScheduleDashboard.jsx";
import { useState } from "react";

function Main({ socketRef, logout, schedules, setSchedules, SetRetrievedSchedule }) {

    if (localStorage.getItem("jwt") == null || localStorage.getItem("jwt") == "") {
        localStorage.clear();
        return (
            <>
                <h1>There was a problem retrieving this page</h1>
                <a href="/"><h2>Please try logging in...</h2></a>
            </>);
    }
    return (
        <>
            <div className="main-container">
                <ScheduleDashboard schedules={schedules} setSchedules={setSchedules} SetRetrievedSchedule={SetRetrievedSchedule} />
                <MeetingDashboard />
                <UpcomingMeetings schedules={schedules} setSchedules={setSchedules} />
                <MeetingHistory />
                <ProfileSection logout={logout} />

            </div>
        </>
    );
}

export default Main;