"use client";
import { useRouteLoader } from "@/hooks/useRouteLoader";
/**
 * RouteLoaderListener listens to Next.js route events and triggers global loading.
 */
export default function RouteLoaderListener() {
  useRouteLoader();
  return null;
}
