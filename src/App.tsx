import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./hooks"
import EventList from "./components/EventList"
import EventForm from "./components/EventForm"
import { Route, Routes, useNavigate } from "react-router-dom"
import EventDetails from "./components/EventDetails"
import { initializeEvents } from "./store/eventReducer"
import EventFormWrapper from "./components/EventFormWrapper"
import RequireAuth from "./components/RequireAuth"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import { checkAuth, logout } from "./store/authReducer"

const App = () => {
  const token = useAppSelector(state => state.auth.token);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(initializeEvents())
  }, [dispatch])

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch])

  useEffect(() => {
    if(token) {
      console.log('Token from Redux:', token);
    }
  }, [token])

  return (
    <div>
      <h1>Event Planner</h1>
      {user ? (
      <div>
          <span>Welcome, {user.name}!</span>
          <button
              onClick={() => {
                  dispatch(logout());
                  navigate("/login");
              }}
          >
              Logout
          </button>
      </div>
      ) : (
          <div>
              <span>You are not logged in.</span>
          </div>
      )}
      <Routes>
        <Route path='/' element={<EventList />} />
        <Route path="/events/:id" element={<EventDetails />}/>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route 
          path="/create" 
          element={
            <RequireAuth>
              <EventForm />
            </RequireAuth>
          }
          />
        <Route path="/edit/:id" element={
          <RequireAuth>
            <EventFormWrapper />
          </RequireAuth>
          }
           />
      </Routes>
      
    </div>
  )
}

export default App;