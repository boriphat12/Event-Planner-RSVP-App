import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks"
import { logout } from "../store/authReducer";
import { NavLink } from "react-router-dom";


const Navbar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const linkStyle = ({ isActive }: { isActive: boolean }) => ({
        marginRight: "1rem",
        textDecoration: "none",
        color: isActive ? "blue" : "black",
        fontWeight: isActive ? "bold" : "normal"
    });

    return (
        <nav style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
            background: "#f5f5f5",
            borderBottom: "1px solid #ddd"
        }}>
            <div>
                <NavLink to="/" style={linkStyle}>Home</NavLink>
                {user && (
                    <>
                        <NavLink to="/myevents" style={linkStyle}>My Events</NavLink>
                        <NavLink to="/create" style={linkStyle}>Create Event</NavLink>
                        <NavLink to="/profile" style={linkStyle}>Profile</NavLink>
                    </>
                )}
            </div>
            <div>
                {user ? (
                    <>
                        <span style={{ marginRight: "1rem" }}>Hi, {user.name}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" style={linkStyle}>Login</NavLink>
                        <NavLink to="/register" style={linkStyle}>Register</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;