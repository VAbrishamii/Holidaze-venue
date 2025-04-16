import axios from "axios";
import { API_BASE } from "@/Lib/constants";
import type {
  RegisterFormData,
  LoginFormData,
  RegisterResponse,
  LoginResponse,
} from "@/Lib/types/auth";
import { setAuthToken } from "@/Lib/api/setAuthToken";

/**
 * Register a new user
 * @param data - Registration data
 * @returns API response
 */
export async function registerUser(
  data: RegisterFormData
): Promise<RegisterResponse> {
  const response = await axios.post(`${API_BASE}/auth/register`, {
    name: data.name,
    email: data.email,
    password: data.password,
    venueManager: data.role === "manager", // true if manager, false if customer
  });

  return response.data;
}
/**
 * Login a user
 * @param data - Login data
 * @returns API response
 */
export async function loginUser(data: LoginFormData): Promise<LoginResponse> {
  const response = await axios.post(`${API_BASE}/auth/login`, {
    email: data.email,
    password: data.password,
  });

  localStorage.setItem("accessToken", response.data.accessToken);
  setAuthToken(response.data.accessToken);

  return response.data;
}
