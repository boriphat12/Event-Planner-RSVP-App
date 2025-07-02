import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, AuthState } from "../types";
import type { AppDispatch } from ".";
import authService from '../services/authService'

const initialState: AuthState = {
    user: null,
    token: null,
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
       }
    }

})

export const { setUser, logout } = authSlice.actions;

export const loginUser = (email: string, password: string) => {
    return async (dispatch : AppDispatch) => {
        const data =await authService.login(email, password)
        dispatch(setUser(data));
        localStorage.setItem('token', data.token)
    }
}

export const registerUser = (email: string, name: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        const data = await authService.register(name, email, password);
        dispatch(setUser(data));
        localStorage.setItem('token', data.token)
    }
}

export default authSlice.reducer;