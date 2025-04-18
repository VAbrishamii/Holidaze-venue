import axios from "axios";
import { API_BASE } from "@/Lib/constants";
/**
 * API base URL from environment
 * axios instance with default headers
 * and base URL for API requests
 */
const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});
/**
 * Set the Authorization header for axios instance
 * @param token - JWT token
 */

export function setAuthToken(token: string | null) {
    if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common["Authorization"];
    }
}
export default axiosInstance;
