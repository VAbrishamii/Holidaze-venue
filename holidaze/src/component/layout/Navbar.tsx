"use client";

import { useState } from "react";
import Link from "next/link";
import LoginModal from "../auth/LoginModal";
import { CircleUser } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import Image from "next/image";
import SmartImage from "../ui/SmartImage";

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

  const router = useRouter();

  const { isLoggedIn, avatar, logout } = useAuth();
  /**
   * Handles user logout
   * - Calls the logout function from the auth context
   * - Displays a success message
   */
  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    toast.success("You’ve been Logged out successfully");
    router.refresh();
  };

  return (
    <header className="w-full shadow-sm bg-background text-textdark dark:bg-background-dark dark:text-textlight">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 w-10 h-10">
          <Image src="/Logo.png" alt="Holidaze Logo" width={50} height={50} />
          <span className="text-xl font-bold">Holidaze</span>
        </Link>

        {/* Auth / Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="hover:text-primary transition-colors"
            aria-label="Toggle user menu">
            {isLoggedIn && avatar ? (
              <SmartImage
                src={avatar}
                alt="User avatar"
                width={40}
                height={40}
                className="w-10 h-10 border border-[var(--color-secondary)] p-0.5 rounded-full object-cover"
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
                    href="/auth/profile"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    Profile
                  </Link>

                  {/* Edit Profile */}
                  {/* <Link
                    href="/auth/profile/edit"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    Edit 
                  </Link> */}

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
