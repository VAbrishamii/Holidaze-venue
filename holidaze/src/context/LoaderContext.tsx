"use client";
import { createContext, useContext, useState } from "react";

type LoaderContextType = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);
/**
 * LoaderProvider is a context provider for managing loading state.
 * It provides a loading state and a function to update it.
 * It can be used to show or hide loading indicators in the application.
 * It uses React's Context API to provide the loading state
 */
export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) throw new Error("useLoader must be used within LoaderProvider");
  return context;
};
