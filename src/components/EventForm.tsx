import { useState } from "react";
import { useAppDispatch } from "../hooks"
import type { EventType } from "../types";
import { createEvent, upEvent } from "../store/eventReducer";
import { useNavigate } from "react-router-dom";

interface Props {
    event?: EventType;
}

const EventForm = ({event} : Props) => {
    const [title, setTitle] = useState(event?.title || "");
    const [description, setDescription] = useState(event?.description || "")
    const [date, setDate] = useState(event?.date || "");
    const [location, setLocation] = useState(event?.location || "");
    const [isPublic, setIsPublic] = useState(event?.isPublic ?? true)


    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newEvent: EventType = {
            id: event?.id || "",
            title,
            description,
            date,
            location,
            isPublic,
            owner: event?.owner || "",
        };
        if(event){
            dispatch(upEvent(newEvent));
        } else {
            dispatch(createEvent(newEvent));
        }
        navigate("/");

    };

    return (
        <div>
            <h2>{event ? "Edit Event" : "Create New Event"}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Description</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Date</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
                </div>
                <div>
                    <label>Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={isPublic}
                            onChange={e => setIsPublic(e.target.checked)}
                        />{" "}
                        Public
                    </label>
                </div>
                <button type="submit">{event ? "Update Event" : "Create Event"}</button>
            </form>
        </div>

        
    )
}

export default EventForm;