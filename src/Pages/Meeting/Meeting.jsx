import { useEffect, useRef, useState } from "react"
import { JitsiMeeting, JaaSMeeting } from "@jitsi/react-sdk";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";

import "./Meeting.css"

function Meeting() {
    const meetingNode = useRef(null);
    const api = useRef(null);
    const [endDateUpdated, setEndDateUpdated] = useState(false);
    const location = useLocation();
    let decodedtoken;

    if (localStorage.getItem("jwt") === null || localStorage.getItem("jwt") === "") {
        return (
            <>
                <h1>There was a problem retrieving this page</h1>
                <a href="/"><h2>Please try logging in first and then retry joining</h2></a>
            </>);
    }
    else if (localStorage.getItem("jwtToken") === null || localStorage.getItem("jwtToken") === "") {
        const isImmediate = location.pathname.split("/").at(-2) === "immediate";
        const meetingRoomId = location.pathname.split("/").at(-1);
        if (isImmediate) {
            fetch(`${import.meta.env.VITE_BACKEND_URL}api/meetings/joinImmediateMeeting?meetingRoomId=${meetingRoomId}&email=${localStorage.getItem("email")}`, {
                method: "POST"
            })
                .then((response) => response.text())
                .then((data) => localStorage.setItem("jwtToken", data))
        }
    }

    // Check key signature before decoding
    decodedtoken = jwtDecode(localStorage.getItem("jwtToken"));
    if (decodedtoken.room !== location.pathname.split("/").at(-1) &&
        decodedtoken.email !== localStorage.getItem("email")) {
        localStorage.removeItem("jwtToken");
        return (
            <>
                <h1>You are not authorised to join this meeting...</h1>
                <a href="/"><h2>Go to CALLIOO</h2></a>
            </>
        )
    }

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = "";
            if (endDateUpdated == false) {
                (async () => {
                    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/meetings/updateEndedAt?meetingRoomId=${localStorage.getItem("meetingRoomId")}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            startedAt: decodedtoken.startedAt,
                            endedAt: new Date().toISOString()
                        })
                    })


                    if (res == true) {
                        setEndDateUpdated(true);
                        window.close();
                    }

                })();
            };

            window.addEventListener("beforeunload", handleBeforeUnload);

            return () => {
                window.removeEventListener("beforeunload", handleBeforeUnload);
            };
        }
    }, []);

    // const domain = 'localhost:8443';
    // const options = {
    //     roomName: localStorage.getItem("roomName"),
    //     width: "100%",
    //     height: "100%",
    //     parentNode: meetingNode.current,
    //     lang: 'en'
    // };
    return (
        <div className="meeting-container" ref={meetingNode}>

            {/* {api.current = new JitsiMeetExternalAPI(domain, options)} */}
            <JitsiMeeting
                domain="callioo-app.duckdns.org"
                roomName={location.pathname.split("/").at(-1)}
                configOverwrite={{
                    startWithAudioMuted: true,
                    disableModeratorIndicator: false,
                    startScreenSharing: false,
                    enableEmailInStats: false,
                    enableUserRolesBasedOnToken: true
                }}
                userInfo={{
                    displayName: localStorage.getItem("name"),
                    moderator: false
                }}
                getIFrameRef={(iframeRef) => {
                    iframeRef.style.height = "100%";

                }}
                onApiReady={(api) => {
                    api.addListener("readyToClose", () => {
                        console.log("Inside readToClose");
                        console.log("Decoded token :- ", decodedtoken);
                        const res = (async () => {
                            await fetch(`${import.meta.env.VITE_BACKEND_URL}api/meetings/updateEndedAt?meetingRoomId=${localStorage.getItem("meetingRoomId")}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    startedAt: decodedtoken.startedAt,
                                    endedAt: new Date().toISOString()
                                })
                            })
                        })();

                        if (res == true) {
                            setEndDateUpdated(true);
                            window.close();
                        }
                    })

                }}
                jwt={localStorage.getItem("jwtToken")}
            />


        </div>
    );

}

export default Meeting;