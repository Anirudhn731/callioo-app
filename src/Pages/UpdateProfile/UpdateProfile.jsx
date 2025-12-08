import { useEffect, useState } from "react";
import "./UpdateProfile.css";
import { useNavigate } from "react-router";

function UpdateProfile({ socketRef, logout }) {
    if (localStorage.getItem("jwt") == null || localStorage.getItem("jwt") == "") {
        localStorage.clear();
        return (
            <>
                <h1>There was a problem retrieving this page</h1>
                <a href="/"><h2>Please try logging in...</h2></a>
            </>);
    }
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        fullName: "",
        email: "",
        password: ""
    })
    const [confirmPass, setConfimPass] = useState("");

    useEffect(() => {
        async function updateData() {
            const email = localStorage.getItem("email");
            if (email != null && email != "") {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/getUser?email=` + email);
                if (res != null) {
                    const data = await res.json();
                    setProfile((prev) => ({ ...prev, "email": email }));
                    setProfile((prev) => ({ ...prev, fullName: data.fullName }));
                }
                else {
                    alert("There was a problem retrieving your information!\nYou are being signed out...");
                    logout(socketRef, navigate);
                }
            }
            else {
                alert("Invalid Request!");
                logout(socketRef, navigate);
            }
        } updateData();
    }, []);

    function onUpdateSubmit(e) {
        e.preventDefault();

        if (profile.fullName != "") {
            if (profile.password == confirmPass) {
                fetch(`${import.meta.env.VITE_BACKEND_URL}api/updateUser`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(profile)
                }).then((response) => response.text()).then((text) => alert(text)).then(() => navigate("/main"));
            }
            else alert("The passwords are not matching! Re-enter password to confirm!");
        }
        else alert("Please enter your full name");
    }

    return (
        <div className="update-profile-container">
            <form onSubmit={(e) => onUpdateSubmit(e)}>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" value={profile.email} aria-describedby="emailHelp" disabled />
                </div>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" value={profile.fullName} onChange={(e) => setProfile((prev) => ({ ...prev, fullName: e.target.value }))} aria-describedby="" placeholder="Enter full name" />
                </div>
                <div className="form-group">
                    <label >New Password</label>
                    <input type="password" value={profile.password} onChange={(e) => setProfile((prev) => ({ ...prev, password: e.target.value }))} placeholder="Enter Password" />
                </div>
                <div className="form-group">
                    <label>Confirm New Password</label>
                    <input type="password" value={confirmPass} onChange={(e) => setConfimPass(e.target.value)} placeholder="Enter Password" />
                </div>
                <button type="submit"> <span className="button_top">Submit</span></button>
            </form>
        </div>
    );

}

export default UpdateProfile;