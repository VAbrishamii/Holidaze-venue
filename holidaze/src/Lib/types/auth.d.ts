import { z } from "zod";
import { registerSchema } from "@/Lib/validation/registerSchema";
import { loginSchema } from "@/Lib/validation/loginSchema";
/**
 * data type for register form
 */
export type RegisterFormData = z.infer<typeof registerSchema>;
/**
 * data type for login form
 */

export type LoginFormData = z.infer<typeof loginSchema>;
/**
 * API response type for login and register
 */
export interface RegisterResponse {
  data: {
    name: string;
    email: string;
    bio: string;
    avatar: {
      url: string;
      alt: string;
    };
    banner: {
      url: string;
      alt: string;
    };
    venueManager: boolean;
  };
  meta: Record<string, any>;
}
export interface LoginResponse {
  data: {
    accessToken: string;
    name: string;
    email: string;
    avatar: {
      url: string;
      alt: string;
    };
    venueManager: boolean;
  };
}
