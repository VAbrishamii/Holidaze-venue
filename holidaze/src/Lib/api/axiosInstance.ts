import axios from "axios";
import { API_BASE } from "@/Lib/constants";

/**
 * Create a reusable Axios instance with dynamic headers.
 * The API key is injected per request using interceptors
 * to avoid static evaluation issues during hydration or navigation.
 */
const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Axios interceptor to attach token and API key dynamically
 */
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      const apiKey = process.env.NEXT_PUBLIC_API_KEY; // ✅ Dynamically fetched

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      if (apiKey) {
        config.headers["X-Noroff-API-Key"] = apiKey;
      } else {
        console.warn(" Missing API key in request config!");
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
