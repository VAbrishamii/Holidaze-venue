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

const token = localStorage.getItem("accessToken");
if (token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
export default axiosInstance;
