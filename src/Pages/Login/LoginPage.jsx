import { useEffect } from "react";
import ImageGrid from "../../Components/ImageGrid/ImageGrid";
import LoginForm from "./Components/LoginForm";
import "./styles/LoginPage.css"
import { useNavigate } from "react-router";

function LoginPage({ socketRef }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("jwt") != null && localStorage.getItem("jwt") != "") {
            navigate("/main");
        }
    }, []);

    return (
        <>
            <div className="login-container">
                <ImageGrid />
                <LoginForm socketRef={socketRef} />
            </div>
        </>
    )

}

export default LoginPage;