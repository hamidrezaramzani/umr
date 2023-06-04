import axios from "axios";
const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
});
const storedUser = localStorage.getItem("umr-user");
let user: {
    token: string
} | undefined;
if (storedUser) {
    user = JSON.parse(storedUser);
}
client.interceptors.request.use(config => {
    config.headers.Authorization = user ? user.token : undefined;
    return config;
});
export default client;