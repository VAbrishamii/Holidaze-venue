/**
 * data type for register form
 */
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  role: "customer" | "manager";
}
/**
 * data type for login form
 */
export interface LoginFormData {
  email: string;
  password: string;
}
/**
 * API response type for login and register
 */
export interface AuthResponse {
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
  meta: Record<string, any>; // Can be adjusted to specific metadata if needed
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
