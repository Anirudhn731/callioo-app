import { useEffect, useState } from "react";

function MeetingHistory() {
    const [meetings, setMeetings] = useState([]);
    useEffect(() => {
        (async () => {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/meetings/getMeetingHistory?email=${localStorage.getItem("email")}`);
            const data = await res.json();
            setMeetings(data);
        })();
    }, [])
    return (
        <div className="meeting-history-container section">
            <h2 className="section-title">Meeting History</h2>
            <div className="meeting-history-div">
                <table className="meeting-history">
                    <thead>
                        <tr>
                            <th>Room</th>
                            <th>Started at</th>
                            <th>Ended at</th>
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
                                    const endDateTime = new Date(meeting.endedAt);
                                    const localEndDate = endDateTime.toLocaleDateString();
                                    const localEndTime = endDateTime.toLocaleTimeString();

                                    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

                                    return (
                                        <tr className="meeting">
                                            <td className="meeting-room-id">{meeting.meetingRoomId}</td>
                                            <td className="meeting-data-time">{`${localStartDate} ${localStartTime} ${timeZone}`}</td>
                                            <td className="meeting-data-time">{meeting.endedAt ? `${localEndDate} ${localEndTime} ${timeZone}` : ""}</td>
                                            <td>{meeting.createdByEmail}</td>
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

export default MeetingHistory;