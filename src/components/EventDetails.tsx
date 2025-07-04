import { useParams } from "react-router-dom"
import { useAppSelector } from "../hooks";
import { Link } from "react-router-dom";

const EventDetails = () => {
    const {id} = useParams<{id: string}>();
    const events = useAppSelector((state) => state.event);
    const event = events.find(e => e.id === id);
    return (
        <div>
            <h2>Event Details</h2>
            <p>Event ID: {id}</p>
            <p>{event?.title}</p>
            <p>{event?.description}</p>
            <p>{event?.location}</p>
            <Link to="/">
                <button>back</button>
            </Link>
        </div>
    )
}

export default EventDetails