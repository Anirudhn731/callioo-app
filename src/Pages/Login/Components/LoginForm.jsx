import { useState } from "react";
import { useNavigate } from "react-router";

function LoginForm({ socketRef }) {
    const navigate = useNavigate();
    const [loginreq, setLoginReq] = useState({ email: "", password: "" });

    async function login(e) {
        e.preventDefault();

        console.log("Logging in...");
        const res = await fetch("http://localhost:9000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginreq)
        })

        const data = await res.json();
        if (data.status === "true") {
            localStorage.setItem("jwt", data.token);
            connectSocket(data.token);
        }
        else {
            alert(data.message);
        }
    }

    function connectSocket(token) {
        const socket = new WebSocket(`ws://localhost:9000/ws?token=${token}`);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log("Logged In!");
            localStorage.setItem("email", loginreq.email);
            navigate("/main");
        };
        socket.onmessage = msg => console.log("Received message: ", msg.data);
    }

    return (
        <div className="login-form">
            <h3> Login </h3>
            <form onSubmit={(e) => login(e)}>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" value={loginreq.email} onChange={(e) => setLoginReq((prev) => ({ ...prev, email: e.target.value }))} aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" alue={loginreq.password} onChange={(e) => setLoginReq((prev) => ({ ...prev, password: e.target.value }))} placeholder="Enter Password" />
                </div>
                <small><a href="/signup">Create an account</a></small><br />
                <button type="submit"> <span className="button_top">Sign In</span> </button>
            </form>
        </div>
    );
}

export default LoginForm;