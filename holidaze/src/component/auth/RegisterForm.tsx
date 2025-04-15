"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

/**
 * * Zod schema for form validation
 * - Email must end with @stud.noroff.no
 * - Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character
 */

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .email("Invalid email")
    .regex(/@stud\.noroff\.no$/, "Email must end with @stud.noroff.no"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

/**
 * Inferred Typescript types from the Zod schema
 * Used by react-hook-form to infer types for the form inputs.
 */
type RegisterData = z.infer<typeof registerSchema>;

/**
 * RegisterForm component for user registration
 * Includes role toggle (Customer/Manager), form validation with Zod,
 * and accessible Tailwind-styled inputs.
 */
export default function RegisterForm() {
  const [role, setRole] = useState<"customer" | "manager">("customer");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  /**
   * Handles submission of the register form.
   * @param data - The validated form values from react-hook-form
   */

  const onSubmit = (data: RegisterData) => {
    console.log("user register", { ...data, role });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center">
        <h1 className="text-md text-[var(--color-secondary)] font-bold">
          Welcome to Holidaze
        </h1>
        <p className="text-xs text-gray-500">Let's get started</p>
      </div>

      {/* Role Toggle Buttons */}
      <div className="flex justify-center gap-4">
        {(["customer", "manager"] as const).map((r) => {
          const isActive = role === r;
          return (
            <button
              type="button"
              key={r}
              onClick={() => setRole(r)}
              className={`px-5 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer duration-200
          ${isActive ? "bg-[var(--color-darkgreen)] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
        `}>
              {r[0].toUpperCase() + r.slice(1)}
            </button>
          );
        })}
      </div>

      {/* Description */}
      <p className="text-sm text-center font-medium text-textdark">
        {role === "customer"
          ? "A customer account is used for booking venues..."
          : "A manager account is used to create and manage venues."}
      </p>

      {/* Input Fields */}
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm">Name</label>
          <input
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
          <label className="block text-sm">Email</label>
          <input
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
          <label className="block text-sm">Password</label>
          <input
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

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[var(--color-darkgreen)] cursor-pointer text-white py-2 rounded-full hover:bg-darkGreen transition">
        Register
      </button>
    </form>
  );
}
