import { useNavigate } from "react-router";
import { v4 as uuidv4 } from 'uuid';

function MeetingDashboard() {
    async function startMeeting() {
        const meetingRoomId = uuidv4();
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/meetings/createMeeting?meetingRoomId=${meetingRoomId}&email=${localStorage.getItem("email")}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (res !== null && typeof res !== "undefined") {
            const data = await res.text();
            console.log("data :- ", data);
            if (data === null || data === "") {
                fetch(`${import.meta.env.VITE_BACKEND_URL}api/meetings/deleteMeeting?meetingRoomId=${meetingRoomId}`, {
                    method: "DELETE"
                })
                alert("There was a problem in setting up the meeting. Please try again later");
            }
            else {
                localStorage.setItem("meetingRoomId", meetingRoomId);
                localStorage.setItem("jwtToken", data);
                console.log("MeetingRoomID before meeting :- ", localStorage.getItem("meetingRoomId"));
                window.open("/meeting/immediate/" + meetingRoomId, "_blank");
            }
        }
        else
            alert("There was a problem in setting up the meeting. Please try again later...");
    }

    return (
        <div className="meeting-dashboard-container section">
            <h2 className="section-title">Meeting Dashboard</h2>
            <button type="button" onClick={(e) => startMeeting()}>Start an immediate meeting</button>
            <button type="button" onClick={(e) => { window.open("/scheduleMeeting/n", "_blank") }}>Schedule recurring meeting</button>
        </div>
    );

}

export default MeetingDashboard;