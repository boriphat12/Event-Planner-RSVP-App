import { useState } from "react"
import { useAppDispatch } from "../hooks";
import { loginUser } from "../store/authReducer";

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const dispatch = useAppDispatch()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(loginUser(email, password))
        console.log('Login success')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>email:{" "}<input value={email} onChange={(e) => setEmail(e.target.value)}/></p>
                <p>password:{" "}<input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/></p>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm