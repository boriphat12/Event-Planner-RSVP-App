import { useState } from "react"
import { registerUser } from "../store/authReducer";
import { useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch()

    const navigate = useNavigate();

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(registerUser(name, email, password));
        setName("")
        setEmail("")
        setPassword("")
        navigate("/");
    }

    return (
        <div>
            <form onSubmit={handleConfirm}>
                <p>
                    name:{" "}
                    <input value={name} onChange={(e) => setName(e.target.value)}/>
                </p>
                <p>
                    email:{" "}
                    <input value={email} onChange={(e) => setEmail(e.target.value)}/>
                </p>
                <p>
                    password:{" "}
                    <input value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
                </p>

                <button type="submit">confirm</button>
            </form>
                <button type="button" onClick={() => navigate("/")}>cancel</button>

        </div>
    )
}

export default RegisterForm