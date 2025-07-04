import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./hooks"
import EventList from "./components/EventList"
import EventForm from "./components/EventForm"
import { Route, Routes } from "react-router-dom"
import EventDetails from "./components/EventDetails"
import { initializeEvents } from "./store/eventReducer"
import EventFormWrapper from "./components/EventFormWrapper"


const App = () => {
  const token = useAppSelector(state => state.auth.token)
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeEvents())
  }, [dispatch])

  useEffect(() => {
    if(token) {
      console.log('Token from Redux:', token);
    }
  }, [token])

  return (
    <div>
      <h1>Event Planner</h1>
      <Routes>
        <Route path='/' element={<EventList />} />
        <Route path="/events/:id" element={<EventDetails />}/>
        <Route path="/create" element={<EventForm />}/>
        <Route path="/edit/:id" element={<EventFormWrapper />} />
      </Routes>
      
    </div>
  )
}

export default App