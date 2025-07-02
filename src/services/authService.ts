import axios from "axios";

const baseUrl = 'http://localhost:3001/api/auth';

const login = async (email: string, password: string) => {
    const response = await axios.post(`${baseUrl}/login`, {email, password});
    return {
        token: response.data.token,
        user: {
            name: response.data.name,
            email: response.data.email,
        }
    }
}

const register = async (name: string, email: string, password: string) => {
    const response = await axios.post(`${baseUrl}/register`, {name, email, password});
    return {
        token: response.data.token,
        user: {
            name: response.data.name,
            email: response.data.email,
        }
    }
}

export default {login, register};