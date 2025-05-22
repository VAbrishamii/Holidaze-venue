"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLoader } from "@/context/LoaderContext";

/**
 * useRouteLoader:
 * Triggers global loading state when the route/pathname changes.
 * Works in Next.js App Router by observing `usePathname()`.
 */
export const useRouteLoader = () => {
  const pathname = usePathname(); // ✅ Detects route change
  const { setLoading } = useLoader();
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLoading(true);

    // Optional: delay to simulate loading for visual feedback
    timer.current = setTimeout(() => {
      setLoading(false);
    }, 400); 

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [pathname, setLoading]);
};
