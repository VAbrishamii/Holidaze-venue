// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import Link from "next/link";
// import LoginModal from "../auth/LoginModal";

// export default function Navbar() {
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   return (
//     <header className="w-full shadow-sm bg-background text-textdark dark:bg-background-dark dark:text-textlight">
//       <nav className="container mx-auto flex items-center justify-between py-4 px-6">
//         {/* Logo */}
//         <Link href="/" className="flex items-center space-x-2 w-10 h-10">
//           <Image
//             src="/Logo.png"
//             alt="Holidaze Logo"
//             width={50}
//             height={50}
//             priority // Loads faster
//           />
//           <span className="text-xl font-bold">Holidaze</span>
//         </Link>

//         {/* Navigation Links */}
//         <div className="flex items-center space-x-6">
//           <Link
//             href="/auth/register"
//             className="hover:text-primary transition-colors">
//             Register
//           </Link>
//           <button
//             onClick={() => setShowLoginModal(true)}
//             className="hover:text-primary transition-colors">
//             Login
//           </button>
//         </div>
//       </nav>
//       {/* Login Modal shown when login button is clicked */}
//       {showLoginModal && (
//         <LoginModal
//           isOpen={showLoginModal}
//           onClose={() => setShowLoginModal(false)}
//         />
//       )}
//     </header>
//   );
// }
"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import LoginModal from "../auth/LoginModal";
import { CircleUser } from "lucide-react";

export default function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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

        {/* User Icon with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="hover:text-primary transition-colors"
          >
            <CircleUser className="w-6 h-6" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-md shadow-md z-50">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  setShowLoginModal(true);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Login
              </button>
              <Link
                href="/auth/register"
                onClick={() => setShowDropdown(false)}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Login Modal shown when login button is clicked */}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </header>
  );
}
