import "./Main.css"

import ProfileSection from "./Components/ProfileSection.jsx";
import MeetingDashboard from "./Components/MeetingDashboard";

function Main({ socketRef, logout }) {

    if (localStorage.getItem("jwt") == null || localStorage.getItem("jwt") == "")
        return (
            <>
                <h1>There was a problem retrieving this page</h1>
                <a href="/"><h2>Please try logging in...</h2></a>
            </>);

    return (
        <>
            <div className="main-container">
                <MeetingDashboard />
                <ProfileSection logout={logout} />

            </div>
        </>
    );
}

export default Main;