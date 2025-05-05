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
import { Plane, Home } from "lucide-react";
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
  const [role, setRole] = useState<"customer" | "manager">("customer");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  // Sync the selected role with the form data
  useEffect(() => {
    if (role) {
      setValue("role", role);
      setValue("venueManager", role === "manager");
    }
  }, [role, setValue]);

  /**
   * submit registration form using react query
   * @param data - The validated form values from react-hook-form
   */
  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success("Registration successful!");
      localStorage.setItem("openLoginModal", "true"); // Store the flag in localStorage
      console.log("Registration successful", data);
      onRegisterSuccess(); // Call the success callback if provided
    },
    onError: (error: any) => {
      if (error.response?.status === 400) {
        const message =
          error.response.data.errors?.[0]?.message || "Something went wrong.";
        toast.error(message);
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.error("Registration failed", error);
    },
  });
  /**
   * Triggered on form submit
   *
   * @param data - Collected form input
   */

  const onSubmit = (data: RegisterFormData) => {
    const formDataToSend = { ...data };
    console.log("user register", formDataToSend);
    mutate(formDataToSend); // Call the mutation function with the form data
  };

  return (
    <div className="w-full max-w-md px-4 sm:px-6 lg:px-8 ">
      <div className="text-center mb-6">
        <h1 className="text-md text-[var(--color-secondary)] font-bold">
          Welcome to Holidaze
        </h1>
        <p className="text-xs text-gray-500">Let's get started</p>
      </div>

      {/* Role Selection Step */}
      {!role && (
        <RoleSwitcher
          selectedRole={role}
          onSelect={(r) => {
            setRole(r);
            setValue("role", r);
            setValue("venueManager", r === "manager");
          }}
        />
      )}
      {/* {!role && (
        <div className="space-y-4">
          <h2 className="text-center font-semibold text-lg mb-2">
            What do you want to do?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole("customer")}
              className="p-4 border rounded-xl shadow hover:shadow-lg transition text-left">
              <Plane className="text-[var(--color-darkgreen)] mb-2" size={24} />
              <h3 className="text-md font-bold mb-1">I want to book a place</h3>
              <p className="text-sm text-gray-600">
                Find and book venues as a traveler.
              </p>
            </button>
            <button
              type="button"
              onClick={() => setRole("manager")}
              className="p-4 border rounded-xl shadow hover:shadow-lg transition text-left">
              <Home className="text-[var(--color-darkgreen)] mb-2" size={24} />
              <h3 className="text-md font-bold mb-1">
                I want to list my place
              </h3>
              <p className="text-sm text-gray-600">
                Host and manage your own venue.
              </p>
            </button>
          </div>
        </div>
      )} */}

      {/* Registration Form (visible only after role is selected) */}
      {role && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
          {/* <p className="text-sm text-center font-medium text-textdark">
            {role === "customer"
              ? "You are already loged In as a customer account that used for booking venues."
              : "You are  already loged In as a manager account is used to create and manage venues."}
          </p> */}

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
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[var(--color-darkgreen)] text-white py-2 rounded-full hover:bg-darkGreen transition flex items-center justify-center">
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
      )}
    </div>
    // <div className="w-full max-w-md px-4 sm:px-6 lg:px-8 ">
    //   <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
    //     <div className="text-center">
    //       <h1 className="text-md text-[var(--color-secondary)] font-bold">
    //         Welcome to Holidaze
    //       </h1>
    //       <p className="text-xs text-gray-500">Let's get started</p>
    //     </div>

    //     {/* Role Toggle Buttons */}
    //     <div className="flex justify-center gap-4">
    //       {(["customer", "manager"] as const).map((r) => {
    //         const isActive = role === r;
    //         return (
    //           <button
    //             type="button"
    //             key={r}
    //             onClick={() => setRole(r)}
    //             className={`px-5 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer duration-200
    //       ${isActive ? "bg-[var(--color-darkgreen)] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
    //     `}>
    //             {r[0].toUpperCase() + r.slice(1)}
    //           </button>
    //         );
    //       })}
    //     </div>

    //     {/* Description */}
    //     <p className="text-sm text-center font-medium text-textdark">
    //       {role === "customer"
    //         ? "A customer account is used for booking venues..."
    //         : "A manager account is used to create and manage venues."}
    //     </p>

    //     {/* Input Fields */}
    //     <div className="space-y-4">
    //       {/* Name */}
    //       <div>
    //         <label
    //           htmlFor="name"
    //           className="block text-sm text-[var(--color-darkgreen)]">
    //           Name
    //         </label>
    //         <input
    //           id="name"
    //           type="text"
    //           {...register("name")}
    //           className="w-full border rounded-md px-3 py-2"
    //           placeholder="Your name"
    //         />
    //         {errors.name && (
    //           <p className="text-xs text-red-500">{errors.name.message}</p>
    //         )}
    //       </div>

    //       {/* Email */}
    //       <div>
    //         <label
    //           htmlFor="email"
    //           className="block text-sm text-[var(--color-darkgreen)]">
    //           Email
    //         </label>
    //         <input
    //           id="email"
    //           type="email"
    //           {...register("email")}
    //           className="w-full border rounded-md px-3 py-2"
    //           placeholder="name@stud.noroff.no"
    //         />
    //         {errors.email && (
    //           <p className="text-xs text-red-500">{errors.email.message}</p>
    //         )}
    //       </div>

    //       {/* Password */}
    //       <div>
    //         <label
    //           htmlFor="password"
    //           className="block text-sm text-[var(--color-darkgreen)]">
    //           Password
    //         </label>
    //         <input
    //           id="password"
    //           type="password"
    //           {...register("password")}
    //           className="w-full border rounded-md px-3 py-2"
    //           placeholder="********"
    //         />
    //         {errors.password && (
    //           <p className="text-xs text-red-500">{errors.password.message}</p>
    //         )}
    //       </div>
    //     </div>

    //     {/* Submit */}
    //     <button
    //       type="submit"
    //       disabled={isPending}
    //       className="w-full bg-[var(--color-darkgreen)] cursor-pointer text-white py-2 rounded-full hover:bg-darkGreen transition flex items-center justify-center">
    //       {isPending ? (
    //         <span className="flex items-center gap-2">
    //           <LoadingSpinner size={18} />
    //           Registering...
    //         </span>
    //       ) : (
    //         "Register"
    //       )}
    //     </button>
    //   </form>
    // </div>
  );
}
