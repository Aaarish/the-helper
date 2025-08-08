import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:9090"
})

export const protectedAxiosInstance = axios.create({
    baseURL: "http://localhost:9090",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("auth") || "{}").token}`
    },
    withCredentials: true
})

export default axiosInstance