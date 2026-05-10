import axios from "axios";
import { tokenStore } from "./tokenStore";

const BASE_URL = import.meta.env.VITE_API_URL || `https://localhost:4000`;

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
// axios is nothing but Request interceptor, anything that goes out of react app has to pass through this layer

// interceptor is like a middleware, jo check krega agar token hai to lagado automatically
// and user ko protected route access krne fo
api.interceptors.request.use((config) => {
    const token = tokenStore.getAccess();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// response capture kiya hai
api.interceptors.response.use((response) => response, async (error) => {
    if(error.response?.status === 401){
        // agaar response me error code 401 aya to new accesstoken from refresh token generate kro
        // refer stack overflow

        
    }
});
