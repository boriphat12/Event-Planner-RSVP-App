
import { useAppDispatch, useAppSelector } from "../hooks"
import { delEvent,  } from "../store/eventReducer";
import type { EventType } from "../types";
import { Link } from "react-router-dom";

const EventList = () => {
    const dispatch = useAppDispatch();
    const events = useAppSelector((state) => state.event);


    const handleDelete = (id: string) => {
        if(window.confirm("Are you sure you want to delete this event?")){
            dispatch(delEvent(id));
        }
    }

    return (
        <div>
            <h2>Events</h2>
            <ul>
                {events.map((event : EventType) => (
                    <li key={event.id}>
                        <Link to={`/events/${event.id}`}>
                            <strong>{event.title}</strong>
                        </Link> - {event.date}
                        <button onClick={() => handleDelete(event.id)}>Delete</button>
                        <Link to={`/edit/${event?.id}`}>
                            <button>Edit event</button>
                        </Link>
                    </li>
                ))}
            </ul>
            <Link to='/create'>
                <button>add new event</button>
            </Link>
        </div>
    )
}

export default EventList;