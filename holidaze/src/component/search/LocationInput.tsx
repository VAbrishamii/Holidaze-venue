import React from "react";

interface Props {
  city: string;
  country: string;
  onCityChange: (value: string) => void;
  onCountryChange: (value: string) => void;
}

/**
 * Location input component for city and country fields
 */
const LocationInput: React.FC<Props> = ({
  city,
  country,
  onCityChange,
  onCountryChange,
}) => {
  return (
    <div className="flex flex-col gap-2 mr-4">
      <label className="text-sm font-semibold">Location</label>

      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
        className="text-gray-500 text-sm outline-none border rounded-md px-2 py-1"
      />

      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => onCountryChange(e.target.value)}
        className="text-gray-500 text-sm outline-none border rounded-md px-2 py-1"
      />
    </div>
  );
};

export default LocationInput;
