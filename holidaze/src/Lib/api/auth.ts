import axiosInstance from "@/Lib/api/axiosInstance";
import { API_BASE } from "@/Lib/constants";
import type {
  RegisterFormData,
  LoginFormData,
  RegisterResponse,
  LoginResponse,
} from "@/Lib/types/auth";

/**
 * Register a new user
 * @param data - Registration data
 * @returns API response
 */
export async function registerUser(
  data: RegisterFormData
): Promise<RegisterResponse> {
  const url = `${API_BASE}/auth/register`;

  const response = await axiosInstance.post(url, {
    name: data.name,
    email: data.email,
    password: data.password,
    venueManager: data.role === "manager",
  });

  return response.data;
}
/**
 * Login a user
 * @param data - Login data
 * @returns API response
 */
export async function loginUser(data: LoginFormData): Promise<LoginResponse> {
  const response = await axiosInstance.post(
    `${API_BASE}/auth/login?_holidaze=true`,
    {
      email: data.email,
      password: data.password,
    }
  );

  return response.data;
}
/**
 * Logout the user
 */
export async function logoutUser() {
  localStorage.removeItem("accessToken");
}
