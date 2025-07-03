import { useEffect } from "react"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import { useAppSelector } from "./hooks"


const App = () => {
  const token = useAppSelector(state => state.auth.token)

  useEffect(() => {
    if(token) {
      console.log('Token from Redux:', token);
    }
  }, [token])

  return (
    <div>
      <h1>Register</h1>
      < RegisterForm/> 
      <h1>Login</h1>
      < LoginForm />
    </div>
  )
}

export default App