import ImageGrid from "../../Components/ImageGrid/ImageGrid";
import SignUpForm from "./Components/SignupForm";
import "./styles/SignUpPage.css";

function SignUpPage() {
    return (
        <>
            <div className="signup-container">
                <ImageGrid />
                <SignUpForm />
            </div>
        </>
    )
}

export default SignUpPage;