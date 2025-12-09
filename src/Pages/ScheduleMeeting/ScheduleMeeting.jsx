import { useEffect, useState } from "react";
import "./ScheduleMeeting.css";
import { useLocation } from "react-router";

function ScheduleMeeting({ retrievedSchedule, SetRetrievedSchedule }) {
    const [users, setUsers] = useState([]);
    const location = useLocation();

    if (localStorage.getItem("jwt") == null || localStorage.getItem("jwt") == "") {
        localStorage.clear();
        return (
            <>
                <h1>There was a problem retrieving this page</h1>
                <a href="/"><h2>Please try logging in...</h2></a>
            </>);
    }

    useEffect(() => {
        // console.log("Retrieved Schedule :- ", retrievedSchedule);
        fetch(`${import.meta.env.VITE_BACKEND_URL}api/getAll`)
            .then((res) => res.json())
            .then((data) => setUsers(data))
    }, [retrievedSchedule]);

    async function onSubmit(e) {
        e.preventDefault();
        if (!retrievedSchedule.meetingRoomId) {
            alert("Please enter a room name");
            return;
        }

        const now = new Date();
        if (new Date(`${retrievedSchedule.startDate}T${retrievedSchedule.startTime}:00`) < now) {
            alert("Starting Date and Time values cannot be in the past!");
            return;
        }
        if (retrievedSchedule.emails.length == 0) {
            alert("Please add members to the meeting");
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/meetings/getAllRooms`)
            const data = await res.json();
            if (data.includes(retrievedSchedule.meetingRoomId) && location.pathname.split("/").at(-1) === "n") {
                alert("Please enter a unique room Name");
                return;
            }
            // console.log("Schedule :- ", retrievedSchedule);
            await fetch(`${import.meta.env.VITE_BACKEND_URL}api/meetings/saveSchedule?browserTZOffset=${(new Date()).getTimezoneOffset()}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(retrievedSchedule)
            })
            // console.log("Saved Schedule :- ", retrievedSchedule);
            alert("Saved Schedule!");
            window.close();
        }
        catch {
            alert("An Error Occurred! Please try again later!");
        }


    }

    return (
        <div className="schedule-meeting-container">
            <h3> Schedule Meeting </h3>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <label>Room Name</label>
                    <input type="text" value={retrievedSchedule.meetingRoomId} onChange={(e) => SetRetrievedSchedule((prev) => ({ ...prev, meetingRoomId: e.target.value }))} aria-describedby="" placeholder="Enter Room name" required />
                </div>
                <div className="form-group">
                    <label>Start Date</label>
                    <input type="date" value={retrievedSchedule.startDate} onChange={(e) => SetRetrievedSchedule((prev) => ({ ...prev, startDate: e.target.value }))} aria-describedby="" min={(() => { const today = new Date(); today.setHours(0, 0, 0); return today.toISOString().split("T")[0] })()} required />
                </div>
                <div className="form-group">
                    <label>End Date</label>
                    <input type="date" value={retrievedSchedule.endDate} onChange={(e) => SetRetrievedSchedule((prev) => ({ ...prev, endDate: e.target.value }))} aria-describedby=""
                        disabled={retrievedSchedule.startDate === ""} min={retrievedSchedule.startDate} required />
                </div>
                <div className="form-group">
                    <label>Start Time</label>
                    <input type="time" value={retrievedSchedule.startTime} onChange={(e) => SetRetrievedSchedule((prev) => ({ ...prev, startTime: e.target.value }))} aria-describedby="" required />
                </div>
                <div className="form-group">
                    <label>
                        <input type="checkbox" onChange={(e) => SetRetrievedSchedule((prev) => ({ ...prev, everyMonday: e.target.checked }))} checked={retrievedSchedule.everyMonday} />
                        Every Monday
                    </label>
                    <label>
                        <input type="checkbox" onChange={(e) => SetRetrievedSchedule((prev) => ({ ...prev, everyTuesday: e.target.checked }))} checked={retrievedSchedule.everyTuesday} />
                        Every Tuesday
                    </label>
                    <label>
                        <input type="checkbox" onChange={(e) => SetRetrievedSchedule((prev) => ({ ...prev, everyWednesday: e.target.checked }))} checked={retrievedSchedule.everyWednesday} />
                        Every Wednesday
                    </label>
                    <label>
                        <input type="checkbox" onChange={(e) => SetRetrievedSchedule((prev) => ({ ...prev, everyThursday: e.target.checked }))} checked={retrievedSchedule.everyThursday} />
                        Every Thursday
                    </label>
                    <label>
                        <input type="checkbox" onChange={(e) => SetRetrievedSchedule((prev) => ({ ...prev, everyFriday: e.target.checked }))} checked={retrievedSchedule.everyFriday} />
                        Every Friday
                    </label>
                    <label>
                        <input type="checkbox" onChange={(e) => SetRetrievedSchedule((prev) => ({ ...prev, everySaturday: e.target.checked }))} checked={retrievedSchedule.everySaturday} />
                        Every Saturday
                    </label>
                    <label>
                        <input type="checkbox" onChange={(e) => SetRetrievedSchedule((prev) => ({ ...prev, everySunday: e.target.checked }))} checked={retrievedSchedule.everySunday} />
                        Every Sunday
                    </label>
                </div>
                <hr />
                <h4>Add Members</h4>
                <div className="form-group">
                    {
                        Array.isArray(users) && (users !== null && typeof users !== "undefined" && users.length > 0) ?
                            users.map((user) => {
                                return (
                                    <label>
                                        <input type="checkbox" value={user.email} checked={retrievedSchedule.emails.includes(user.email)}
                                            onChange={(event) => {
                                                const { value, checked } = event.target;
                                                if (value === localStorage.getItem("email")) {
                                                    return;
                                                }
                                                if (checked) {
                                                    SetRetrievedSchedule((prev) => ({ ...prev, emails: [...prev.emails, value] }));
                                                } else {
                                                    SetRetrievedSchedule((prev) => ({ ...prev, emails: [...prev.emails.filter(val => (val !== value))] }));
                                                }
                                            }} />
                                        {`${user.fullName} - (${user.email})`}
                                    </label>
                                );
                            }) : "No users... If this is not expected, please try again later"
                    }
                </div>


                <button type="submit">Submit</button>

            </form>
        </div>
    )
}

export default ScheduleMeeting;