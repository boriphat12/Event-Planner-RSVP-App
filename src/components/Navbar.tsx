import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks"
import { logout } from "../store/authReducer";
import { Link } from "react-router-dom";


const Navbar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);
    const auth = useAppSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

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
                <Link to="/" style={{marginRight: "1rem"}}>Home</Link>
                {auth.token && (
                    <Link to='/myevents'>
                        <button>My Events</button>
                    </Link>
                )}
                {user && <Link to="/create" style={{marginRight: "1rem"}}>Create Event</Link>}
                
            </div>
            <div>
                {user ? (
                    <>
                        <span style={{marginRight: "1rem"}}>Hi, {user.name}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ): (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar;