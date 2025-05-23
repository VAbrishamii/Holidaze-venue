"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
/**
 * Footer component for the Holidaze app
 * - Displays the current year and copyright information
 * - Provides a link to the contact page
 */

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full bg-black text-white ">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Left side */}
        <span className="text-sm">
          {" "}
          {"\u00A9"} {year ?? "----"}, Holidaze
        </span>

        {/* Right side */}
        <Link href="/" className="text-sm hover:text-primary transition-colors">
          Contact
        </Link>
      </div>
    </footer>
  );
}
