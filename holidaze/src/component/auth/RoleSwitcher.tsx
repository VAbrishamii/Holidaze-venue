"use client";

import { Plane, Home } from "lucide-react";

type Props = {
  selectedRole: "customer" | "manager" | null;
  onSelect: (role: "customer" | "manager") => void;
};
/**
 * RoleSwitcher component
 * - Allows users to select between two roles: Customer and Manager
 * - Displays a brief description of each role
 * - Highlights the selected role
 * - Uses Tailwind CSS for styling
 */

export default function RoleSwitcher({ selectedRole, onSelect }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-center font-semibold text-lg mb-2">
        What do you want to do?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onSelect("customer")}
          className={`p-4 border rounded-xl shadow hover:shadow-lg transition text-left flex flex-col items-start gap-2 cursor-pointer ${
            selectedRole === "customer" ? "bg-green-50 border-green-500" : ""
          }`}>
          <Plane className="h-6 w-6 text-[var(--color-darkgreen)]" />
          <h3 className="text-sm font-bold">I want to book a place</h3>
          <p className="text-sm text-gray-600">
            Find and book venues as a traveler.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onSelect("manager")}
          className={`p-4 border rounded-xl shadow hover:shadow-lg transition text-left flex flex-col items-start gap-2 cursor-pointer ${
            selectedRole === "manager" ? "bg-green-50 border-green-500" : ""
          }`}>
          <Home className="h-6 w-6 text-[var(--color-darkgreen)]" />
          <h3 className="text-sm font-bold">I want to list my place</h3>
          <p className="text-sm text-gray-600">
            Host and manage your own venue.
          </p>
        </button>
      </div>
    </div>
  );
}
