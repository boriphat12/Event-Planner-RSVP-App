import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks"
import { delEvent } from "../store/eventReducer";

const MyEvents = () => {
    const dispatch = useAppDispatch();
    const events = useAppSelector((state) => state.event);
    const auth = useAppSelector((state) => state.auth)

    if(!auth.token || !auth.user) {
        return <p>You must be logged in to view your events.</p>;
    }

    const myEvents = events.filter(event => event.owner === auth.user?.id);

    const handleDelete = (id: string) => {
        if(window.confirm("Are you sure you want to delete this?")){
            dispatch(delEvent(id));
        }
    };

    return (
        <div>
            <h2>My Events</h2>
            {myEvents.length === 0 ? (
                <p>You haven't created any events yet</p>
            ) : (
                <ul>
                    {myEvents.map(event => (
                        <li key={event.id}>
                            <Link to={`/events/${event.id}`}>
                            <strong>{event.title}</strong>
                            </Link>{" "}
                            - {event.date}
                            <Link to={`/edit/${event.id}`}>
                                <button>Edit</button>
                            </Link>
                            <button onClick={() => handleDelete(event.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
            <Link to ='/create'>
                <button>Create new event</button>
            </Link>
        </div>
    )

}

export default MyEvents;