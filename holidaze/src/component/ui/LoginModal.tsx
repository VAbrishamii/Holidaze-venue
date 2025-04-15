"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
/**
 * Zod schema for login validation
 * - Email must end with @stud.noroff.no
 * - Password must be at least 8 characters
 */
const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .regex(/@stud\.noroff\.no$/, "Email must end with @stud.noroff.no"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
/**
 * TypeScript type inferred from login schema
 */
type LoginFormData = z.infer<typeof loginSchema>;
/**
 * LoginModal component
 * - Handles modal toggle
 * - Uses form validation with Zod + React Hook Form
 * - Styled with Tailwind + optional dark mode
 */
export default function LoginModal() {
  const [isMounted, setIsMounted] = useState(false); // SSR-safe render flag
  const [isOpen, setIsOpen] = useState(false); // Modal toggle

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  /**
   * Handles login form submission
   */
  const onSubmit = (data: LoginFormData) => {
    console.log("Login submitted:", data);
    closeModal();
  };
  return (
    <>
      <button
        onClick={openModal}
        className="hover:text-primary transition-colors">
        Login
      </button>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/30 flex items-center justify-center">
            <div className="relative bg-white dark:bg-background-dark p-8 rounded-lg shadow-lg max-w-md w-full">
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                aria-label="Close">
                <X size={20} />
              </button>

              <h2 className="text-xl font-bold text-center mb-4">
                Welcome Back
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="email@stud.noroff.no"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">Password</label>
                  <input
                    type="password"
                    {...register("password")}
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="********"
                  />
                  {errors.password && (
                    <p className="text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[var(--color-darkgreen)] text-white py-2 rounded-full hover:bg-primary transition">
                  Sign In
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
