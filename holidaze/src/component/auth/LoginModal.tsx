"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/Lib/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/Lib/validation/loginSchema";
import { LoginFormData } from "@/Lib/types/auth";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import LoadingSpinner from "@/component/ui/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import { AxiosError } from "axios";

/**
 * Props for the LoginModal component.
 * @property isOpen - Whether the modal is visible.
 * @property onClose - Callback to close the modal.
 */
type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
/**
 * LoginModal component
 *
 * - Handles user login using email and password
 * - Stores accessToken, avatar, and venueManager status in localStorage
 * - Redirects based on user role (manager or customer)
 * - Uses React Query for async login request
 * - Displays validation using Zod schema
 */

export default function LoginModal({ onClose, isOpen }: LoginModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuth();

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

  /**
   * Login mutation using React Query.
   * On success, saves token and user data to localStorage and redirects.
   */
  const { mutate: login, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const token = data.data.accessToken;
      const name = data.data.name;
      const email = data.data.email;
      const avatarUrl = data.data.avatar?.url || "";
      const isManager = data.data.venueManager ?? false;

      setAuth(token, { name, email }, avatarUrl, isManager);

      toast.success("Login successful!");
      onClose();

      // Redirect based on role
      if (isManager) {
        router.push("/auth/profile");
        // router.push("/auth/profile/manager");
      } else {
        router.push("/");
      }
    },
    onError: (error: AxiosError) => {
      // Safely access nested properties using type assertions and optional chaining
      const message =
        (error.response?.data as { errors?: { message?: string }[] })
          ?.errors?.[0]?.message || "An unexpected error occurred.";
      toast.error(message);
      console.error("Login failed", error);
    },
  });

  /**
   * Submit handler for the login form
   * @param data - validated form data
   */
  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  if (!isMounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/30 flex items-center justify-center p-3">
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          aria-label="Close">
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-center mb-4">Welcome Back</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="email@stud.noroff.no"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="********"
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[var(--color-darkgreen)] text-white py-2 rounded-full hover:bg-primary transition flex items-center justify-center">
            {isPending ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner size={18} />
                Siging...
              </span>
            ) : (
              "Sing In"
            )}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
