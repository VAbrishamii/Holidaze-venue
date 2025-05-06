"use client";
import React from "react";
import { Search } from "lucide-react";

/**
 * Search button component for the search form
 * - On small screens: full-width button with label
 * - On medium+ screens: icon button
 */
export default function SearchButton() {
  return (
    <button
      type="submit"
      aria-label="Search venues"
      className={`
        bg-[var(--color-secondary)] text-white cursor-pointer rounded-full
        flex items-center justify-center
        transition hover:bg-orange-600

        w-full py-2 text-sm font-semibold
        sm:w-10 sm:h-10 sm:ml-4 sm:py-0 sm:text-base sm:font-normal
      `}>
      {/* Text label on small screens, hidden on sm and up */}
      <span className="block sm:hidden">Search</span>

      {/* Icon only on sm and up */}
      <Search className="hidden sm:block" />
    </button>
  );
}
