import { useState } from "react";
import { useAppDispatch } from "../hooks"
import type { EventType } from "../types";
import { createEvent } from "../store/eventReducer";

const EventForm = () => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [isPublic, setIsPublic] = useState(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newEvent: EventType = {
            id: "",
            title,
            date,
            isPublic,
            owner: ""
        }
        dispatch(createEvent(newEvent));
        setTitle("");
        setDate("");

    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Event</h2>
            <input 
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input 
                placeholder="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <label>
                Public:
                <input 
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                />
            </label>
            <button type="submit">Create</button>
        </form>
    )
}

export default EventForm;