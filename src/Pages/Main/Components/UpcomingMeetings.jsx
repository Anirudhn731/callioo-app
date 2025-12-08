import { useEffect, useState } from "react";

function UpcomingMeetings({ schedules }) {
    const [meetings, setMeetings] = useState([]);
    useEffect(() => {
        (async () => {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/meetings/getUpcomingMeetings?email=${localStorage.getItem("email")}`);
            const data = await res.json();
            setMeetings(data);
        })();
    }, [schedules])

    async function joinMeeting(meetingRoomId, startedAt) {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/meetings/getJwtToken?meetingRoomId=${meetingRoomId}&email=${localStorage.getItem("email")}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(startedAt)
        })
        const data = await res.text()
        console.log("Join Meeting :- ", data);
        localStorage.setItem("meetingRoomId", meetingRoomId);
        localStorage.setItem("jwtToken", data);
        window.open("/meeting/" + meetingRoomId, "_blank");
    }

    return (
        <div className="upcoming-meetings-container section">
            <h2 className="section-title">Upcoming Meetings</h2>
            <div className="upcoming-meetings-div">
                <table className="upcoming-meetings">
                    <thead>
                        <tr>
                            <th>Room</th>
                            <th>Start Time</th>
                            <th>Created By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(meetings) && (meetings !== null && typeof meetings !== "undefined" && meetings.length > 0) ?
                                meetings.map((meeting) => {
                                    const startDatteTime = new Date(meeting.startedAt);
                                    const localStartDate = startDatteTime.toLocaleDateString();
                                    const localStartTime = startDatteTime.toLocaleTimeString();

                                    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

                                    return (
                                        <tr className="meeting">
                                            <td className="meeting-room-id">{meeting.meetingRoomId}</td>
                                            <td className="meeting-data-time">{`${localStartDate} ${localStartTime} ${timeZone}`}</td>

                                            <td>{meeting.createdByEmail}</td>
                                            <button type="button" onClick={() => joinMeeting(meeting.meetingRoomId, meeting.startedAt)}
                                                disabled={Math.abs(startDatteTime - new Date()) > (60 * 60 * 1000)}>Join Meeting</button>
                                        </tr>
                                    );
                                }) : ""
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default UpcomingMeetings;