import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { loginUser } from "../store/authReducer";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(loginUser({ email, password }));
        const token = localStorage.getItem("token");
        if (token) {
            navigate(from, { replace: true });
        } else {
            alert("Login failed!");
        }
    };

    return (
        <Paper elevation={3} sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
            </Box>
        </Paper>
    );
};

export default LoginForm;
