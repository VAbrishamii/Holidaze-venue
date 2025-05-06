"use client";
import { Search } from "lucide-react";

interface props {
  onClick: () => void;
}

/**
 * A compact search bar for small screens that triggers the search modal.
 */
export default function CompactSearchBar({ onClick }: props) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-2 mb-4 border rounded-full shadow-sm bg-white sm:flex md:hidden">
      <span className="text-sm text-gray-500">Where to go?</span>
      <Search className="text-gray-500" />
    </button>
  );
}
