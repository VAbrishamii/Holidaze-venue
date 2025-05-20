"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";


/**
 * AuthContextType defines the shape of the authentication context.
 * It includes user information, token, avatar, manager status,
 */
type AuthContextType = {
  user: { name: string; email: string } | null;
  token: string | null;
  avatar: string | null;
  banner: string | null;
  isManager: boolean;
  isLoggedIn: boolean;
  setAuth: (
    token: string | null,
    user: { name: string; email: string } | null,
    avatar?: string | null,
    isManager?: boolean
  ) => void;
  logout: () => void;
};
/**
 * AuthContext provides authentication state and methods to manage it.
 * It includes user information, token, avatar, manager status,
 * and methods to set authentication state and logout.
 *
 */
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [token, setToken] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isManager, setIsManager] = useState<boolean>(false);

  const router = useRouter();
  /**
   * Effect to check for existing authentication token and user data
   * in localStorage when the component mounts.
   */
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");
    const storedAvatar = localStorage.getItem("avatar");
    // const storedIsManager = localStorage.getItem("venueManager") === "true";

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const managerFromUser = parsedUser.venueManager === true;
        setAuth(storedToken, parsedUser, storedAvatar, managerFromUser);
      } catch {
        setAuth(null, null);
      }
    }
  }, []);
  /**
   * Function to set authentication state and store it in localStorage.
   */
  const setAuth = (
    newToken: string | null,
    newUser: { name: string; email: string } | null,
    newAvatar: string | null = null,
    isManager: boolean = false
  ) => {
    setToken(newToken);
    setUser(newUser);
    setAvatar(newAvatar);
    setIsManager(isManager?? false);

    if (newToken && newUser) {
      const updatedUser = {
        ...newUser, venueManager: isManager,
      };
      localStorage.setItem("accessToken", newToken);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem("avatar", newAvatar || "");
      // localStorage.setItem("venueManager", String(isManager));
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  };


  /**
   * Function to log out the user and clear authentication state.
   * It removes the token and user data from localStorage.
   */

  const logout = () => {
  
    setToken(null);
    setUser(null);
    setAvatar(null);
    setIsManager(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    router.push("/");
  
  }

  /**
   * * AuthContext value object that contains user information,
   */
  const value: AuthContextType = {
    user,
    token,
    avatar,
    banner: null,
    isManager,
    isLoggedIn: !!token,
    setAuth,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
