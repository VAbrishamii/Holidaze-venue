"use client";

import { useState, useContext, use, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const isPastTab = searchParams.get("tab") === "past";
  const [wantsToBecomeManager, setWantsToBecomeManager] = useState(false);

  if (!auth) return null;

  const { isManager, setAuth, token, user, avatar } = auth;


useEffect(() => {
    const upgraded = localStorage.getItem("upgradToManager");
    if (upgraded === "true" && !isManager) {
      setWantsToBecomeManager(true);
      localStorage.removeItem("upgradToManager");
    }
    }, [isManager]);

  const isActive = (href: string) =>
    pathname + searchParams.toString() === href;
  /**
   * Handles the "Become a Venue Manager" action.
   * Simulates a role update using setAuth.
   */
const handleBecomeManager = () => {
    if (!user) return;

    localStorage.setItem("upgradeToManager", "true");
    setAuth(token, user, avatar, true); // Simulate venue manager
    setWantsToBecomeManager(true);
    toast.success("You're now a Venue Manager! and can create venues.");
  };
  // Function to determine the class for each link
  const linkClass = (href: string) =>
    `flex items-center gap-2 hover:text-purple-700 transition font-medium ${
      isActive(href)
        ? "text-purple-700 font-semibold border-l-4 border-purple-700 bg-purple-50"
        : "hover:text-purple-700 text-gray-700"
    }`;

  const tabHref = isPastTab
    ? "/auth/profile?tab=upcoming"
    : "/auth/profile?tab=past";
  const tabLabel = isPastTab ? "Upcoming Trips" : "Past Trips";

  return (
    <aside className="h-44 sm:w-56 p-4 bg-white rounded-xl shadow border flex flex-col gap-4">
      <Link href={tabHref} className={linkClass(tabHref)}>
        <Map className="w-5 h-5" /> {tabLabel}
      </Link>

      <Link
        href="/auth/profile/edit"
        className={linkClass("/auth/profile/edit")}>
        <UserCog className="w-5 h-5" /> Edit Profile
      </Link>

      {isManager || wantsToBecomeManager ? (
        <Link
          href="/auth/profile/create"
          className={linkClass("/auth/profile/create")}>
          <Home className="w-5 h-5" /> Create a New Venue
        </Link>
      ) : (
        <button
          onClick={handleBecomeManager}
         
          className="flex items-center gap-2 text-purple-600 font-medium hover:underline disabled:opacity-50">
          <PlusCircle className="w-5 h-5" /> Become a Venue Manager
        </button>
      )}
    </aside>
  );
}
