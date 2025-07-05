import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, AuthState, LoginSystem } from "../types";
import type { AppDispatch } from ".";
import authService from '../services/authService'
import axios from "axios";

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token') || null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
       setUser(state, action: PayloadAction<{user: User; token: string}>){
        state.user = action.payload.user
        state.token = action.payload.token
       },
       logout(state) {
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
       }
    }

})

export const { setUser, logout } = authSlice.actions;

export const loginUser = ({email, password}: LoginSystem) => {
    return async (dispatch : AppDispatch) => {
        const data =await authService.login(email, password)
        dispatch(setUser(data));
        localStorage.setItem('token', data.token)
    }
}

export const registerUser = (name: string, email: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        const data = await authService.register(name, email, password);
        dispatch(setUser(data));
        localStorage.setItem('token', data.token)
    }
}

export const checkAuth = () => {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');
        if(token){
            const userResponse = await axios.get('http://localhost:3001/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            dispatch(setUser({ user: userResponse.data, token }));
        }
    }
}

export default authSlice.reducer;