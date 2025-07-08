import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { delEvent } from "../store/eventReducer";
import type { EventType } from "../types";
import { Link } from "react-router-dom";

import {
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    Button,
    Pagination,
    Stack,
    IconButton
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const PAGE_SIZE = 5;

const EventList = () => {
    const dispatch = useAppDispatch();
    const events = useAppSelector((state) => state.event);
    const auth = useAppSelector((state) => state.auth);

    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("dateDesc");
    const [currentPage, setCurrentPage] = useState(1);

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            dispatch(delEvent(id));
        }
    };

    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.date.includes(search)
    );

    const sortedEvents = [...filteredEvents].sort((a, b) => {
        switch (sortBy) {
            case "dateAsc":
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            case "dateDesc":
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            case "titleAsc":
                return a.title.localeCompare(b.title);
            case "titleDesc":
                return b.title.localeCompare(a.title);
            default:
                return 0;
        }
    });

    const totalPages = Math.ceil(sortedEvents.length / PAGE_SIZE);
    const paginatedEvents = sortedEvents.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Events
            </Typography>

            {/* Search and Sort Controls */}
            <Stack direction="row" spacing={2} mb={3}>
                <TextField
                    variant="outlined"
                    placeholder="Search by title or date"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    InputProps={{
                        startAdornment: <SearchIcon />
                    }}
                    sx={{ flex: 1 }}
                />

                <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    variant="outlined"
                    sx={{ width: 200 }}
                >
                    <MenuItem value="dateDesc">Newest First</MenuItem>
                    <MenuItem value="dateAsc">Oldest First</MenuItem>
                    <MenuItem value="titleAsc">Title A-Z</MenuItem>
                    <MenuItem value="titleDesc">Title Z-A</MenuItem>
                </Select>

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleIcon />}
                    component={Link}
                    to="/create"
                >
                    New Event
                </Button>
            </Stack>

            {/* Events List */}
            <Stack spacing={2}>
                {paginatedEvents.map((event: EventType) => (
                    <Box
                        key={event.id}
                        sx={{
                            border: "1px solid #ddd",
                            borderRadius: 2,
                            padding: 2,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <Box>
                            <Typography variant="h6" component={Link} to={`/events/${event.id}`} sx={{ textDecoration: "none", color: "inherit" }}>
                                {event.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {event.date}
                            </Typography>
                        </Box>

                        {auth.token && auth.user?.id === event?.owner && (
                            <Stack direction="row" spacing={1}>
                                <IconButton
                                    color="primary"
                                    component={Link}
                                    to={`/edit/${event?.id}`}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    color="error"
                                    onClick={() => handleDelete(event.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>
                        )}
                    </Box>
                ))}
            </Stack>

            {/* Pagination */}
            <Stack alignItems="center" mt={3}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(_, value) => setCurrentPage(value)}
                    color="primary"
                />
            </Stack>
        </Box>
    );
};

export default EventList;
