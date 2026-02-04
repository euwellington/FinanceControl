import axios from "axios";
import toast from "react-hot-toast/headless";

const baseURL = import.meta.env.VITE_API_MAIN;

const api = axios.create({
    baseURL: baseURL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("@token");
        if (token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            toast.error("Parece que seu token expirou. Você vai ser redirecionado para a tela de login");
            setTimeout(() => {
                window.location.href = '/';
            }, 5000)

        }
        return Promise.reject(error);
    }
);

export default api;