import { useState } from "react";
import { useAppDispatch } from "../hooks";
import type { EventType } from "../types";
import { createEvent, upEvent } from "../store/eventReducer";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
    Paper,
} from "@mui/material";

interface Props {
    event?: EventType;
}

const EventForm = ({ event }: Props) => {
    const [title, setTitle] = useState(event?.title || "");
    const [description, setDescription] = useState(event?.description || "");
    const [date, setDate] = useState(event?.date || "");
    const [location, setLocation] = useState(event?.location || "");
    const [isPublic, setIsPublic] = useState(event?.isPublic ?? true);

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
        if (event) {
            dispatch(upEvent(newEvent));
        } else {
            dispatch(createEvent(newEvent));
        }
        navigate("/");
    };

    return (
        <Paper elevation={3} sx={{ maxWidth: 600, mx: "auto", p: 3, mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                {event ? "Edit Event" : "Create New Event"}
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                />
                <TextField
                    label="Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField
                    label="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isPublic}
                            onChange={(e) => setIsPublic(e.target.checked)}
                            color="primary"
                        />
                    }
                    label="Public"
                    sx={{ mt: 2 }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    {event ? "Update Event" : "Create Event"}
                </Button>
            </Box>
        </Paper>
    );
};

export default EventForm;
