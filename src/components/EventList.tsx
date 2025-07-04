import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks"
import { delEvent, initializeEvents } from "../store/eventReducer";
import type { EventType } from "../types";

const EventList = () => {
    const dispatch = useAppDispatch();
    const events = useAppSelector((state) => state.event);

    useEffect(() => {
        dispatch(initializeEvents());
    }, [dispatch]);

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
                        <strong>{event.title}</strong> - {event.date}
                        <button onClick={() => handleDelete(event.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default EventList;