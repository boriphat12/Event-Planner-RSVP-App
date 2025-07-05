import { useState } from "react"
import { useAppDispatch } from "../hooks";
import { loginUser } from "../store/authReducer";
import { useLocation, useNavigate } from "react-router-dom";

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/"

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(loginUser({email, password}));
        const token = localStorage.getItem('token');
        if(token){
            navigate(from, {replace: true})
        } else {
            alert("Login failed!");
        }

    }

   return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    Email:{" "}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </p>
                <p>
                    Password:{" "}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </p>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm