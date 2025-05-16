"use client";

import CreateVenueForm from "@/component/createVenue/CreateVenueFrom";

export default function CreateVenuePage() {
 
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Venue</h1>
   
      <CreateVenueForm />

    </div>
  );
}
