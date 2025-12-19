import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useLogoutUserMutation } from "../../services/auth"; 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

import "./index.css"
const LogoutPopup = () => {
    const [logoutUser, { isLoading }] = useLogoutUserMutation();
    const navigate = useNavigate();

    const handleLogout = async (close) => {
        try {
            await logoutUser().unwrap();
            Cookies.remove("jwt_token");
            toast.success("Logged out successfully!");
            close(); 
            navigate("/"); 
        } catch (error) {
            toast.error(error?.data?.message || "Logout failed!");
        }
    };
    return (
        <Popup
            modal
            trigger={<button className="button logout-button">Logout</button>}
            contentStyle={{ border: "none", borderRadius: "12px", width: "90%", maxWidth: "400px" }}
        >
            {(close) => (
                <div className="popup-layout">
                    <h2>Are you sure you want to logout?</h2>
                    <div className="flex-buttons">
                        <button onClick={() => handleLogout(close)} disabled={isLoading} className="button logout-button">
                            Logout
                        </button>
                        <button onClick={close} className="button close-button">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    )
}

export default LogoutPopup
