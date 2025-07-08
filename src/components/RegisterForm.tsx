import { useState } from "react";
import { registerUser } from "../store/authReducer";
import { useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
} from "@mui/material";

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerUser(name, email, password));
        setName("");
        setEmail("");
        setPassword("");
        navigate("/");
    };

    return (
        <Paper elevation={3} sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Register
            </Typography>
            <Box component="form" onSubmit={handleConfirm}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
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
                    Confirm
                </Button>
                <Button
                    type="button"
                    onClick={() => navigate("/")}
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    sx={{ mt: 1 }}
                >
                    Cancel
                </Button>
            </Box>
        </Paper>
    );
};

export default RegisterForm;
