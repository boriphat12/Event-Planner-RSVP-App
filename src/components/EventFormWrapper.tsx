import { useParams } from "react-router-dom"
import { useAppSelector } from "../hooks";
import EventForm from "./EventForm";


const EventFormWrapper = () => {
    const {id} = useParams<{id : string}>();
    const events = useAppSelector(state => state.event);
    const event = events.find(e => e.id === id);
    if(!event) return <p>Event not found.</p>
    return <EventForm event={event}/>
}

export default EventFormWrapper;