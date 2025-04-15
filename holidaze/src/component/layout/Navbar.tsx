"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full shadow-sm bg-background text-textdark dark:bg-background-dark dark:text-textlight">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 w-10 h-10">
          <Image
            src="/Logo.png"
            alt="Holidaze Logo"
            width={50}
            height={50}
            priority // Loads faster
          />
          <span className="text-xl font-bold">Holidaze</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            href="/auth/register"
            className="hover:text-primary transition-colors">
            Register
          </Link>
          <Link
            href="/auth/login"
            className="hover:text-primary transition-colors">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
