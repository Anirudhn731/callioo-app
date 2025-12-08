import { useState } from "react";
import { useNavigate } from "react-router";

function SignUpForm({ setIsSelectedSignUp }) {
    const navigate = useNavigate();
    const initialUser = {
        fullName: "",
        email: "",
        password: ""
    }
    const [newUser, setNewUser] = useState(initialUser);
    const [confirmPass, setConfimPass] = useState("");

    function onSignUpSubmit(e) {
        e.preventDefault();

        if (newUser.fullName != "") {
            if (newUser.email != "") {
                if (newUser.password != "") {
                    if (newUser.password == confirmPass) {
                        fetch(`${import.meta.env.VITE_BACKEND_URL}api/register`, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newUser)
                        }).then((response) => (response.json()))
                            .then((data) => {
                                if (data === true)
                                    alert("Successfully registered new user!");
                                else {
                                    alert("User with this email already exists!");
                                }
                                navigate("/");
                            });
                    }
                    else alert("The passwords are not matching! Re-enter password to confirm!")
                }
                else alert("Please enter a password");
            }
            else alert("Please enter an email");
        }
        else {
            alert("Please enter your full name");
        }
    }

    return (
        <div className="signup-form">
            <h3> Sign Up </h3>
            <form onSubmit={onSignUpSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" value={newUser.fullName} onChange={(e) => setNewUser((prev) => ({ ...prev, fullName: e.target.value }))} aria-describedby="" placeholder="Enter full name" />
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" value={newUser.email} onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))} aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" value={newUser.password} onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))} placeholder="Enter Password" />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" value={confirmPass} onChange={(e) => setConfimPass(e.target.value)} placeholder="Enter Password" />
                </div>
                <small><a href="/">Click here to login instead</a></small><br />
                <button type="submit"> <span className="button_top">Sign Up</span></button>
            </form>
        </div>
    );
}

export default SignUpForm;