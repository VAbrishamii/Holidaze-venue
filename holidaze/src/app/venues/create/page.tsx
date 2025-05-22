"use client";

import CreateVenueForm from "@/component/createVenue/CreateVenueFrom";
/**
 * CreateVenuePage component
 * - This component is responsible for rendering the Create Venue page.
 * It includes the CreateVenueForm component.
 */

export default function CreateVenuePage() {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Venue</h1>

      <CreateVenueForm />
    </div>
  );
}
