import axios from "axios";
import type { EventType } from "../types";

const baseUrl = 'http://localhost:3001/api/events';
const autoConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

const addEvent = async (event: EventType) => {
    const response = await axios.post(`${baseUrl}`, event, autoConfig());
    return response.data;
}

const updateEvent = async (event: EventType) => {
    const response = await axios.put(`${baseUrl}/${event.id}`, event, autoConfig());
    return response.data;
}

const deleteEvent = async (id: string) => {
    const response = await axios.delete(`${baseUrl}/${id}`, autoConfig());
    return response.data
}

export default {getAll, addEvent, updateEvent, deleteEvent};