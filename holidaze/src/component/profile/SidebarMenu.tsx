"use client";

import { useState, useContext, use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import { AuthContext } from "@/context/AuthContext";
import { Map, UserCog, PlusCircle, Home } from "lucide-react";

/**
 * SidebarMenu displays profile-related navigation with conditional rendering
 * based on whether the user is a customer or a venue manager.
 */
export default function SidebarMenu() {
  const auth = useContext(AuthContext);
  const pathname = usePathname();
  const [wantsToBecomeManager, setWantsToBecomeManager] = useState(false);

  if (!auth) return null;

  const { isManager, setAuth, token, user, avatar } = auth;
  const isActive = (href: string) => pathname === href;
  /**
   * Handles the "Become a Venue Manager" action.
   * Simulates a role update using setAuth.
   */
  const handleBecomeManager = () => {
    setAuth(token, user, avatar, true);
    setWantsToBecomeManager(true);
    toast.success("You are now a Venue Manager!");
  };
  const linkClass = (href: string) =>
    `flex items-center gap-2 hover:text-purple-700 transition font-medium ${
      isActive(href)
        ? "text-purple-700 font-semibold border-l-4 border-purple-700 bg-purple-50"
        : "hover:text-purple-700 text-gray-700"
    }`;
  return (
   <aside className="w-full sm:w-64 p-4 bg-white rounded-xl shadow border flex flex-col gap-4">
      <Link href="/profile/trips" className={linkClass("/profile/trips")}>
        <Map className="w-5 h-5" /> Past Trips
      </Link>

      <Link href="/auth/profile/edit" className={linkClass("/auth/profile/edit")}>
        <UserCog className="w-5 h-5" /> Edit Profile
      </Link>

      {isManager ? (
        <Link
          href="/auth/profile/create"
          className={linkClass("/auth/profile/create")}
        >
          <Home className="w-5 h-5" /> Create a New Venue
        </Link>
      ) : !wantsToBecomeManager ? (
        <button
          onClick={handleBecomeManager}
          className="flex items-center gap-2 text-purple-600 font-medium hover:underline"
        >
          <PlusCircle className="w-5 h-5" /> Become a Venue Manager
        </button>
      ) : (
        <Link
          href="/auth/profile/create"
          className={linkClass("auth/profile/create")}
        >
          <Home className="w-5 h-5" /> Create a New Venue
        </Link>
      )}
    </aside>
  );
}
