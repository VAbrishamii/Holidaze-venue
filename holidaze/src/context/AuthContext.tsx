"use client";

// import { setAuthToken } from "@/Lib/api/axiosInstance";
import { createContext, useState, useEffect, ReactNode } from "react";

type AuthContextType = {
  user: { name: string; email: string } | null;
  token: string | null;
  isLoggedIn: boolean;
  setAuth: (
    token: string | null,
    user: { name: string; email: string } | null
  ) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setAuth(storedToken, parsedUser);
        } catch {
          setAuth(null, null); 
        }
      }
  }, []);

  const setAuth = (
    newToken: string | null,
    newUser: { name: string; email: string } | null
  ) => {
    setToken(newToken);
    setUser(newUser);

    if (newToken && newUser) {
      localStorage.setItem("accessToken", newToken);
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  const value: AuthContextType = {
    user,
    token,
    isLoggedIn: !!token,
    setAuth,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
