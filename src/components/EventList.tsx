
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks"
import { delEvent,  } from "../store/eventReducer";
import type { EventType } from "../types";
import { Link } from "react-router-dom";

const PAGE_SIZE = 5;

const EventList = () => {
    const dispatch = useAppDispatch();
    const events = useAppSelector((state) => state.event);
    const auth = useAppSelector((state) => state.auth);

    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("dateDesc");
    const [currentPage, setCurrentPage] = useState(1);

    const handleDelete = (id: string) => {
        if(window.confirm("Are you sure you want to delete this event?")){
            dispatch(delEvent(id));
        }
    }

    const filteredEvents = events.filter(event => 
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.date.includes(search)
    )

    const sortedEvents = [...filteredEvents].sort((a, b) => {
        switch (sortBy) {
            case "dateAsc":
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            case "dataDesc":
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            case "titleAsc":
                return a.title.localeCompare(b.title);
            case "titleDesc":
                return b.title.localeCompare(a.title);
            default:
                return 0;
        }
    })

    const totalPages = Math.ceil(sortedEvents.length / PAGE_SIZE);
    const paginatedEvents = sortedEvents.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );


    return (
        <div>
            <h2>Events</h2>
            <input 
                type="text"
                placeholder="Search by title or date"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    setCurrentPage(1);
                }}
                style={{marginBottom: "1rem", padding: "0.5rem", width: "300px"}}
            />

            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ marginLeft: "1rem", padding: "0.5rem" }}
            >
                <option value="dateDesc">Newest First</option>
                <option value="dateAsc">Oldest First</option>
                <option value="titleAsc">Title A-Z</option>
                <option value="titleDesc">Title Z-A</option>
            </select>
            <ul>
                {paginatedEvents.map((event : EventType) => (
                    <li key={event.id}>
                        <Link to={`/events/${event.id}`}>
                            <strong>{event.title}</strong>
                        </Link> - {event.date}
                        {auth.token && auth.user?.id === event?.owner && (
                            <>
                                <Link to={`/edit/${event?.id}`}>
                                    <button>Edit</button>
                                </Link>
                                <button onClick={() => handleDelete(event.id)}>Delete</button>
                            </>
                        )}
                        
                    </li>
                ))}
            </ul>

             <div style={{ marginTop: "1rem" }}>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        disabled={currentPage === i + 1}
                        style={{
                            margin: "0 0.25rem",
                            padding: "0.5rem",
                            background: currentPage === i + 1 ? "#ccc" : "#f5f5f5"
                        }}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
            <Link to='/create'>
                <button style={{marginTop: "1rem"}}>add new event</button>
            </Link>
        </div>
    )
}

export default EventList;