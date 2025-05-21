import axios from "axios";
import { API_BASE, API_KEY } from "@/Lib/constants";
/**
 * API base URL from environment
 * axios instance with default headers
 * and base URL for API requests
 */
const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
  },
});

/**
 * Axios interceptor: Automatically attach token from localStorage
 * to every request if available
 */
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    console.log("🔥 Token in Axios request:", config.headers["Authorization"]);

    return config;
    
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
