import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { EventType } from "../types";
import type { AppDispatch } from ".";
import eventService from "../services/eventService";


const initialState: EventType[] = [];

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setEvents(_state, action: PayloadAction<EventType[]>){
            return action.payload;
        },
        addEvent(state, action: PayloadAction<EventType>){
            state.push(action.payload)
        },
        deleteEvent(state, action: PayloadAction<string>){
            return state.filter(event => event.id !== action.payload);
        },
        updateEvent(state, action: PayloadAction<EventType>){
            const index = state.findIndex(e => e.id === action.payload.id);
            if(index !== -1){
                state[index] = action.payload;
            }
        }
    }

})

export const {setEvents, addEvent, deleteEvent, updateEvent} = eventSlice.actions;

export const initializeEvents = () => {
    return async (dispatch: AppDispatch) => {
        const data = await eventService.getAll();
        dispatch(setEvents(data));
    }
}

export const createEvent = (e: EventType) => {
    return async (dispatch: AppDispatch) => {
        const data = await eventService.addEvent(e);
        dispatch(addEvent(data))
    }
}

export const delEvent = (id: string) => {
    return async (dispatch: AppDispatch) => {
        await eventService.deleteEvent(id);
        dispatch(deleteEvent(id));
    }
}

export const upEvent = (e: EventType) => {
    return async (dispatch: AppDispatch) => {
        const data = await eventService.updateEvent(e);
        dispatch(updateEvent(data ?? e));
    }
}

export default eventSlice.reducer;