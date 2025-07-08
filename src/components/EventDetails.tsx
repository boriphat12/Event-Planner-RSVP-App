import { useParams, Link } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { Box, Typography, Button, Paper } from "@mui/material";

const EventDetails = () => {
    const { id } = useParams<{ id: string }>();
    const events = useAppSelector((state) => state.event);
    const event = events.find((e) => e.id === id);

    if (!event) {
        return (
            <Typography variant="h6" sx={{ mt: 4, textAlign: "center" }}>
                Event not found.
            </Typography>
        );
    }

    return (
        <Paper elevation={3} sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                {event.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {event.date} - {event.location}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                {event.description}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/"
            >
                Back to Events
            </Button>
        </Paper>
    );
};

export default EventDetails;
