import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function ScheduleDashboard({ schedules, setSchedules, SetRetrievedSchedule }) {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/meetings/getAllScheduleRooms`);
            const data = await res.json();
            setSchedules(data);
            // console.log(data);
        })()
    }, [])

    async function onEditSchedule(e, schedule) {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/meetings/getSchedule?meetingRoomId=${schedule}`);
        const data = await res.json();
        // console.log("Data :- ", data);
        if (data !== null) {
            SetRetrievedSchedule(data);
        }
        await navigate("/scheduleMeeting/o");


    }

    function onDelete(e, schedule) {
        fetch(`${import.meta.env.VITE_BACKEND_URL}api/meetings/deleteSchedule?meetingRoomId=${schedule}`, {
            method: "DELETE"
        })
            .then(() => setSchedules((prev) => [...prev.filter((s) => { s !== schedule })]))
            .then(() => console.log("Deleted schedule!"));
    }

    return (
        <div className="schedule-dashboard section">
            <h2 className="section-title">Schedule Dashboard</h2>
            {
                Array.isArray(schedules) && (schedules !== null && typeof schedules !== "undefined" && schedules.length > 0) ?
                    schedules.map((schedule) => {
                        if (schedule !== "") {
                            return (
                                <div className="schedule">
                                    <h4 className="schedule-room">{schedule}</h4>
                                    <button type="button" onClick={(e) => { onEditSchedule(e, schedule) }}>Edit Schedule</button>
                                    <button type="button" className="delete-profile-btn" onClick={(e) => { onDelete(e, schedule) }}>Delete Schedule</button>
                                </div>
                            );
                        }
                    })
                    : (() => {
                        return (
                            <div className="no-schedule">
                                No schedules
                            </div>
                        )
                    })()
            }
        </div>
    );
}

export default ScheduleDashboard;