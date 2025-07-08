import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "../store/authReducer";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const linkStyle = ({ isActive }: { isActive: boolean }) => ({
        color: "white",
        textDecoration: "none",
        marginRight: "1rem",
        fontWeight: isActive ? "bold" : "normal",
    });

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Event Planner
                </Typography>
                <Box>
                    <NavLink to="/" style={linkStyle}>
                        Home
                    </NavLink>
                    {user && (
                        <>
                            <NavLink to="/myevents" style={linkStyle}>
                                My Events
                            </NavLink>
                            <NavLink to="/create" style={linkStyle}>
                                Create Event
                            </NavLink>
                            <NavLink to="/profile" style={linkStyle}>
                                Profile
                            </NavLink>
                        </>
                    )}
                    {user ? (
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <>
                            <NavLink to="/login" style={linkStyle}>
                                Login
                            </NavLink>
                            <NavLink to="/register" style={linkStyle}>
                                Register
                            </NavLink>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
