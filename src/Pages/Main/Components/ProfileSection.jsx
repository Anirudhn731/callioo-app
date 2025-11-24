import { useNavigate } from "react-router";

function ProfileSection({ socketRef, logout }) {
    const navigate = useNavigate();

    function deleteAccount() {
        fetch("http://localhost:9000/api/deleteUser?email=" + localStorage.getItem("email"),
            {
                method: "DELETE",
            })
            .then((data) => {
                if (data) {
                    alert("Successfully deleted profile!");
                    logout(socketRef, navigate);
                }
                else alert("There was a problem in deleting your profile!");
            })
    }

    return (
        <div className="profile-container section">
            <h2 className="section-title">Profile Section</h2>
            <button type="button" onClick={(e) => logout(socketRef, navigate)}>Log out</button>
            <button type="button" onClick={() => navigate("/updateProfile")}>Update Profile/Password</button>

            <button type="button" className="delete-profile-btn" onClick={() => deleteAccount()}>Delete Account</button>
        </div>
    )

}

export default ProfileSection;
