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

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ onClose, isOpen }: LoginModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

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

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.data.accessToken);
      alert("Login successful!");
      onClose();

      // Redirect based on role
      if (data.data.venueManager) {
        router.push("/manager/profile");
      } else {
        router.push("/");
      }
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.errors?.[0]?.message ||
        "An unexpected error occurred.";
      alert(message);
      console.error("Login failed", error);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login submitted:", data);
    login(data);
  };

  if (!isMounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/30 flex items-center justify-center">
      <div className="relative bg-white dark:bg-background-dark p-8 rounded-lg shadow-lg max-w-md w-full">
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
            <label className="block text-sm mb-1">Email</label>
            <input
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
            <label className="block text-sm mb-1">Password</label>
            <input
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
            className="w-full bg-[var(--color-darkgreen)] text-white py-2 rounded-full hover:bg-primary transition">
            {isPending ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
