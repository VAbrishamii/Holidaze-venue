"use client";

// import { useAuth } from "@/hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import CreateVenueForm from "@/component/venues/CreateVenue";
import CreateVenueForm from "@/component/createVenue/CreateVenueFrom";
export default function CreateVenuePage() {
  // const { isManager, isLoggedIn } = useAuth();
  // const router = useRouter();

 
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.push("/auth/login");
  //   } else if (!isManager) {
  //     router.push("/auth/profile"); 
  //   }
  // }, [isManager, isLoggedIn]);

  // if (!isManager) return null;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Venue</h1>
      {/* <CreateVenueForm /> */}
      <CreateVenueForm />

    </div>
  );
}
