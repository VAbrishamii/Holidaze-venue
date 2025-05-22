"use client";
import { useRouteLoader } from "@/hooks/useRouteLoader";
/**
 * RouteLoaderListener listens to Next.js route events and triggers global loading.
 * Place this in RootLayout to activate the PageLoader on navigation.
 */
export default function RouteLoaderListener() {
  useRouteLoader();
  return null;
}
