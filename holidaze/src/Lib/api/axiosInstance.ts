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
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

// /**
//  * Set the Authorization header for axios instance
//  * @param token - JWT token
//  */

// export function setAuthToken(token: string | null) {
//     if (token) {
//         axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     } else {
//         delete axiosInstance.defaults.headers.common["Authorization"];
//     }
// }
// export default axiosInstance;
