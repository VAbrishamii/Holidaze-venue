// "use client";

// import { useState, useContext, use, useEffect } from "react";
// import Link from "next/link";
// import { usePathname, useSearchParams } from "next/navigation";
// import { toast } from "react-hot-toast";
// import { AuthContext } from "@/context/AuthContext";
// import { Map, UserCog, PlusCircle, Home } from "lucide-react";

// /**
//  * SidebarMenu displays profile-related navigation with conditional rendering
//  * based on whether the user is a customer or a venue manager.
//  */
// export default function SidebarMenu() {
//   const auth = useContext(AuthContext);
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const isPastTab = searchParams.get("tab") === "past";
//   const [wantsToBecomeManager, setWantsToBecomeManager] = useState(false);

//   if (!auth) return null;

//   const { isManager, setAuth, token, user, avatar } = auth;


// useEffect(() => {
//     const upgraded = localStorage.getItem("upgradToManager");
//     if (upgraded === "true" && !isManager) {
//       setWantsToBecomeManager(true);
//       localStorage.removeItem("upgradToManager");
//     }
//     }, [isManager]);

//   const isActive = (href: string) =>
//     pathname + searchParams.toString() === href;
//   /**
//    * Handles the "Become a Venue Manager" action.
//    * Simulates a role update using setAuth.
//    */
// const handleBecomeManager = () => {
//     if (!user) return;

//     localStorage.setItem("upgradeToManager", "true");
//     setAuth(token, user, avatar, true); // Simulate venue manager
//     setWantsToBecomeManager(true);
//     toast.success("You're now a Venue Manager! and can create venues.");
//   };
//   // Function to determine the class for each link
//   const linkClass = (href: string) =>
//     `flex items-center gap-2 hover:text-[var(--color-secondary)] transition font-medium ${
//       isActive(href)
//         ? "text-[var(--color-darkgreen)] font-semibold border-l-4 border-[var(--color-darkgreen)] pl-2"
//         : "hover:text-[var(--color-secondary)]"
//     }`;

//   const tabHref = isPastTab
//     ? "/auth/profile?tab=upcoming"
//     : "/auth/profile?tab=past";
//   const tabLabel = isPastTab ? "Upcoming Trips" : "Past Trips";

//   return (
//     <aside className="h-44 sm:w-56 p-4 bg-white rounded-xl shadow border flex flex-col gap-4">
//       <Link href={tabHref} className={linkClass(tabHref)}>
//         <Map className="w-5 h-5" /> {tabLabel}
//       </Link>

//       <Link
//         href="/auth/profile/edit"
//         className={linkClass("/auth/profile/edit")}>
//         <UserCog className="w-5 h-5" /> Edit Profile
//       </Link>

//       {isManager || wantsToBecomeManager ? (
//         <Link
//           href="/auth/profile/create"
//           className={linkClass("/auth/profile/create")}>
//           <Home className="w-5 h-5" /> Create a New Venue
//         </Link>
//       ) : (
//         <button
//           onClick={handleBecomeManager}
         
//           className="flex items-center gap-2 text-[var(--color-darkgreen)] font-medium hover:underline disabled:opacity-50">
//           <PlusCircle className="w-5 h-5" /> Become a Venue Manager
//         </button>
//       )}
//     </aside>
//   );
// }


// "use client";

// import { useContext } from "react";
// import Link from "next/link";
// import { usePathname, useSearchParams, useRouter } from "next/navigation";
// import { toast } from "react-hot-toast";
// import { AuthContext } from "@/context/AuthContext";
// import { Map, UserCog, Home, LogOut } from "lucide-react";

// /**
//  * SidebarMenu displays profile-related navigation with conditional rendering
//  * based on whether the user is a customer or a venue manager.
//  */
// export default function SidebarMenu() {
//   const auth = useContext(AuthContext);
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const isPastTab = searchParams.get("tab") === "past";

//   if (!auth) return null;

//   const { isManager, logout } = auth;

//   const isActive = (href: string) => pathname + searchParams.toString() === href;

//   const linkClass = (href: string) =>
//     `flex items-center gap-2 hover:text-[var(--color-secondary)] transition font-medium ${
//       isActive(href)
//         ? "text-[var(--color-darkgreen)] font-semibold border-l-4 border-[var(--color-darkgreen)] pl-2"
//         : "hover:text-[var(--color-secondary)]"
//     }`;

//   const tabHref = isPastTab
//     ? "/auth/profile?tab=upcoming"
//     : "/auth/profile?tab=past";
//   const tabLabel = isPastTab ? "Upcoming Trips" : "Past Trips";

//   const handleBlockedCreate = () => {
//     toast((t) => (
//       <div className="space-y-2 text-sm">
//         <p className="font-medium">Only venue managers can create venues.</p>
//         <p className="text-gray-600">Please log out and register again as a venue manager.</p>
//         <div className="flex justify-end gap-2">
//           <button
//             onClick={() => toast.dismiss(t.id)}
//             className="text-gray-500 hover:text-black text-xs"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               logout();
//               toast.dismiss(t.id);
//               router.push("/auth/register");
//             }}
//             className="flex items-center gap-1 px-3 py-1 rounded bg-[var(--color-darkgreen)] text-white text-xs hover:bg-[var(--color-primary)]"
//           >
//             <LogOut size={14} /> Register Again
//           </button>
//         </div>
//       </div>
//     ));
//   };

//   return (
//     <aside className="h-44 sm:w-56 p-4 bg-white rounded-xl shadow border flex flex-col gap-4">
//       <Link href={tabHref} className={linkClass(tabHref)}>
//         <Map className="w-5 h-5" /> {tabLabel}
//       </Link>

//       <Link
//         href="/auth/profile/edit"
//         className={linkClass("/auth/profile/edit")}
//       >
//         <UserCog className="w-5 h-5" /> Edit Profile
//       </Link>

//       <button
//         onClick={() => {
//           if (isManager) {
//             router.push("/auth/profile/create");
//           } else {
//             handleBlockedCreate();
//           }
//         }}
//         className="flex items-center gap-2 text-[var(--color-darkgreen)] font-medium hover:underline"
//       >
//         <Home className="w-5 h-5" /> Create a New Venue
//       </button>
//     </aside>
//   );
// }
"use client";

import { useContext } from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { AuthContext } from "@/context/AuthContext";
import { Map, UserCog, Home, LogOut } from "lucide-react";

/**
 * SidebarMenu displays profile-related navigation with conditional rendering
 * based on whether the user is a customer or a venue manager.
 */
export default function SidebarMenu() {
  const auth = useContext(AuthContext);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isPastTab = searchParams.get("tab") === "past";

  if (!auth) return null;

  const { isManager, logout } = auth;

  const isActive = (href: string) => pathname + searchParams.toString() === href;

  const linkClass = (href: string) =>
    `flex items-center gap-2 hover:text-[var(--color-secondary)] transition font-medium ${
      isActive(href)
        ? "text-[var(--color-darkgreen)] font-semibold border-l-4 border-[var(--color-darkgreen)] pl-2"
        : "hover:text-[var(--color-secondary)]"
    }`;

  const tabHref = isPastTab
    ? "/auth/profile?tab=upcoming"
    : "/auth/profile?tab=past";
  const tabLabel = isPastTab ? "Upcoming Trips" : "Past Trips";

  const handleBlockedCreate = () => {
    toast((t) => (
      <div className="space-y-2 text-sm">
        <p className="font-medium">Only venue managers can create venues.</p>
        <p className="text-gray-600">Please log out and register again as a venue manager.</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-gray-500 hover:text-black text-xs"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              logout();
              toast.dismiss(t.id);
              router.push("/auth/register");
            }}
            className="flex items-center gap-1 px-3 py-1 rounded bg-[var(--color-darkgreen)] text-white text-xs hover:bg-[var(--color-primary)]"
          >
            <LogOut size={14} /> Register Again
          </button>
        </div>
      </div>
    ));
  };

  return (
    <aside className="h-44 sm:w-56 p-4 bg-white rounded-xl shadow border flex flex-col gap-4">
      <Link href={tabHref} className={linkClass(tabHref)}>
        <Map className="w-5 h-5" /> {tabLabel}
      </Link>

      <Link
        href="/auth/profile/edit"
        className={linkClass("/auth/profile/edit")}
      >
        <UserCog className="w-5 h-5" /> Edit Profile
      </Link>

      <button
        onClick={() => {
          if (isManager) {
            router.push("/venues/create");
          } else {
            handleBlockedCreate();
          }
        }}
        className="flex items-center gap-2 text-[var(--color-darkgreen)] font-medium cursor-pointer"
      >
        <Home className="w-5 h-5" /> Create a New Venue
      </button>
    </aside>
  );
}
