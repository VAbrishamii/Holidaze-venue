"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
/**
 * LoginModal component that renders a login button and a modal popup form.
 * - Modal is safely rendered only on the client using `isMounted`.
 * - Clicking "Login" opens the modal, clicking "×" closes it.
 * - Uses React Portal to render modal outside the main app tree.
 */
export default function LoginModal() {
  // Track if we're on the client to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  // Controls whether the modal is open
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Ensures modal is only rendered on the client (not during SSR).
   */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent rendering during SSR
  if (!isMounted) return null;

  /**
   * Opens the modal when "Login" button is clicked.
   */
  const openModal = () => setIsOpen(true);

  /**
   * Closes the modal when "×" is clicked.
   */
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Button to trigger login modal */}
      <button
        onClick={openModal}
        className="hover:text-primary transition-colors">
        Login
      </button>

      {/* Modal rendered with portal */}
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/20 flex items-center justify-center ">
            <div className="relative bg-white dark:bg-background-dark p-8 rounded-lg shadow-lg max-w-md w-full h-100">
              {/* Title */}
              <h2 className="text-xl font-bold text-center mb-4">
                Hi, Welcome Back
              </h2>

              {/* Login form */}
              <form className="space-y-4 ">
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="email@stud.noroff.no"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="********"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[var(--color-darkgreen)] text-white py-3 mt-5 rounded-full hover:bg-primary transition">
                  Sign In
                </button>
              </form>

              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-black text-lg"
                aria-label="Close">
                <X size={20} />
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
