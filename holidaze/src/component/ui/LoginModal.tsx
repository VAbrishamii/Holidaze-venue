"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/Lib/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/Lib/validation/loginSchema";
import { LoginFormData } from "@/Lib/types/auth";
import { X } from "lucide-react";

/**
 * LoginModal component
 * - Modal UI using portal
 * - Form validation with React Hook Form & Zod
 * - Authentication using React Query mutation
 */
export default function LoginModal() {
  const [isMounted, setIsMounted] = useState(false); // SSR-safe render flag
  const [isOpen, setIsOpen] = useState(false); // Modal toggle

  /**
   * Open and close modal functions
   */
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  /**
   * Mutation hook for logging in the user
   */
  const { mutate: login, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.data.accessToken);
      alert("Login successful!");
      console.log("Login successful", data);
    },
    onError: (error: any) => {
      if (error.response?.status === 400) {
        const message =
          error.response.data.errors?.[0]?.message || "Something went wrong.";
        alert(message);
      } else {
        alert("An unexpected error occurred.");
      }
      console.error("Login failed", error);
    },
  });

  /**
   * Handles login form submission
   */
  const onSubmit = (data: LoginFormData) => {
    console.log("Login submitted:", data);
    login({ ...data });
    closeModal();
  };

  if (!isMounted) return null;

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
                  disabled={isPending}
                  className="w-full bg-[var(--color-darkgreen)] text-white py-2 rounded-full hover:bg-primary transition">
                  {isPending ? "Signing In..." : "Sign In"}
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
