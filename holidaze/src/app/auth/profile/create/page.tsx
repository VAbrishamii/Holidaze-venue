"use client";
import AmenitiesSelector from "@/component/ui/AmenitiesSelector";

export default function CreateVenue() {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Venue</h1>
      <form>
        {/* Add form fields here */}
        <AmenitiesSelector
          value={{ wifi: false, breakfast: false, parking: false, pets: false }}
          onChange={(value) => console.log(value)}
        />
      </form>
    </div>
  );
}
