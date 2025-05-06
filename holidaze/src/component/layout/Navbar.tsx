"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LoginModal from "../auth/LoginModal";
import { CircleUser } from "lucide-react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/Lib/api/auth";

/**
 * Navbar component for the Holidaze app.
 *
 * - Displays the logo
 * - Shows user icon or avatar if logged in
 * - Allows login/register or logout
 * - Redirects to customer or manager profile based on role
 */
export default function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control the login modal
  const [showDropdown, setShowDropdown] = useState(false); // State to control the dropdown menu
  const [isLoggedIn, setIsLoggedIn] = useState(false); //true if the user is logged in
  const [isManager, setIsManager] = useState(false); //true if the user is a venue manager
  const [avatar, setAvatar] = useState<string | null>(null); // State to store the avatar URL
  const router = useRouter();

  /**
   * Effect to load login state and role from localStorage
   */
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedAvatar = localStorage.getItem("avatar");
    const venueManager = localStorage.getItem("venueManager") === "true";
    if (token) {
      setIsLoggedIn(true);
      setAvatar(storedAvatar && storedAvatar !== "null" ? storedAvatar : null);
      setIsManager(venueManager);
    } else {
      setIsLoggedIn(false);
      setAvatar(null);
      setIsManager(false);
    }
  }, [showLoginModal]);
  /**
   * Handles logout by clearing local storage and state
   */
  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setAvatar(null);
    setIsManager(false);
    router.refresh();
  };

  return (
    <header className="w-full shadow-sm bg-background text-textdark dark:bg-background-dark dark:text-textlight">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 w-10 h-10">
          <img src="/Logo.png" alt="Holidaze Logo" width={50} height={50} />
          <span className="text-xl font-bold">Holidaze</span>
        </Link>

        {/* Auth / Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="hover:text-primary transition-colors"
            aria-label="Toggle user menu">
            {isLoggedIn && avatar ? (
              <img
                src={avatar}
                alt="User avatar"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            ) : (
              <CircleUser className="w-8 h-8" />
            )}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-md shadow-md z-50">
              {isLoggedIn ? (
                <>
                  <Link
                    href={
                      isManager
                        ? "/auth/profile/manager"
                        : "/auth/profile/customer"
                    }
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      setShowLoginModal(true);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    Login
                  </button>
                  <Link
                    href="/auth/register"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Login Modal shown when login button is clicked */}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </header>
  );
}
