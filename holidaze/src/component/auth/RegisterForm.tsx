
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/Lib/api/auth";
import { RegisterFormData } from "@/Lib/types/auth";
import { registerSchema } from "@/Lib/validation/registerSchema";
import { toast } from "react-hot-toast";
import LoadingSpinner from "@/component/ui/LoadingSpinner";
import RoleSwitcher from "./RoleSwitcher";

/**
 * props type for RegisterForm component
 */
type Props = {
  onRegisterSuccess: () => void;
};

/**
 * RegisterForm component for creating new accounts
 * - Handles both Customer and Manager registration
 * - Validates inputs using Zod schema
 * - Submits data using React Query's `useMutation`
 */
export default function RegisterForm({ onRegisterSuccess }: Props) {
  const [role, setRole] = useState<"customer" | "manager" | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
/**
 * Sync the selected role with the form data
 */
  useEffect(() => {
    if (role) {
      setValue("role", role);
      setValue("venueManager", role === "manager");
    }
  }, [role, setValue]);
  /**
   * submit registration form using react query
   */

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success("Registration successful!");
      localStorage.setItem("openLoginModal", "true");
      console.log("Registration successful", data);
      onRegisterSuccess();
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.errors?.[0]?.message || "Something went wrong.";
      toast.error(message);
      console.error("Registration failed", error);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutate(data);
  };

  return (
    <div className="w-full max-w-md px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6">
        <h1 className="text-md text-[var(--color-secondary)] font-bold">
          Welcome to Holidaze
        </h1>
        <p className="text-xs text-gray-500">Let's get started</p>
      </div>

      {/* Always show Role Switcher */}
      <RoleSwitcher
        selectedRole={role}
        onSelect={(r) => {
          setRole(r);
          setValue("role", r);
          setValue("venueManager", r === "manager");
        }}
      />

      {/* Registration Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
        {role && (
          <p className="text-sm text-center font-medium text-textdark">
            {role === "customer"
              ? "You're registering as a customer. You can book venues."
              : "You're registering as a manager. You can list and manage venues."}
          </p>
        )}

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm text-[var(--color-darkgreen)]">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-[var(--color-darkgreen)]">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full border rounded-md px-3 py-2"
              placeholder="name@stud.noroff.no"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-[var(--color-darkgreen)]">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="w-full border rounded-md px-3 py-2"
              placeholder="********"
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending || !role}
          className="w-full bg-[var(--color-darkgreen)] text-white py-2 rounded-full hover:bg-darkGreen transition flex items-center justify-center cursor-pointer">
          {isPending ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size={18} />
              Registering...
            </span>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
}
