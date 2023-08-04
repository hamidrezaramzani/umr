import axios from "axios";
import { STORAGE_NAME } from "../context/UserProvider";
const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

client.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem(STORAGE_NAME);
  let user:
    | {
        token: string;
      }
    | undefined;
  if (storedUser) {
    user = JSON.parse(storedUser);
  }
  config.headers.Authorization = user ? user.token : undefined;
  return config;
});
export default client;
