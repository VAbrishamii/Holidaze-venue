"use client";
import React from "react";

interface Props {
  value: string | undefined;
  onChange: (value: string) => void;
}

/**
 * Location input component for location search.
 * Accepting city, country or both as props.
 */
const LocationInput: React.FC<Props> = ({ value, onChange }) => {

  return (
    <div className="flex flex-col mr-4 px-2">
      <label className="text-sm font-semibold">Location</label>
      <input
        type="text"
        placeholder="Search your destination"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="text-gray-500 text-sm outline-none rounded-md py-1 hover:cursor-pointer"
      />
    </div>
  );
};

export default LocationInput;
