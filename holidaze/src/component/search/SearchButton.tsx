import React from "react";
import { Search } from "lucide-react";
/**
 *  Search button component for the search form
 */
export default function SearchButton() {
  return (
    <button
      type="submit"
      aria-label="Search venues"
      className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center ml-4 cursor-pointer">
      <Search />
    </button>
  );
}
