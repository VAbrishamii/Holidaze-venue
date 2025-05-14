"use client";
import { useState } from "react";
import { Wifi, Coffee, Car, PawPrint } from "lucide-react";

type Amenities = {
  wifi: boolean;
  breakfast: boolean;
  parking: boolean;
  pets: boolean;
};
interface Props {
  value: Amenities;
  onChange: (value: Amenities) => void;
}
/**
 * A toggle-style component for selecting venue amenities.
 * Includes wifi, breakfast, parking, and pets.
 */
export default function AmenitiesSelector({ value, onChange }: Props) {
  const toggleAmenity = (key: keyof Amenities) => {
    onChange({ ...value, [key]: !value[key] });
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold">Amenities</label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <AmenityToggle
          label="Wi-Fi"
          icon={<Wifi className="w-5 h-5" />}
          selected={value.wifi}
          onClick={() => toggleAmenity("wifi")}
        />
        <AmenityToggle
          label="Breakfast"
          icon={<Coffee className="w-5 h-5" />}
          selected={value.breakfast}
          onClick={() => toggleAmenity("breakfast")}
        />
        <AmenityToggle
          label="Parking"
          icon={<Car className="w-5 h-5" />}
          selected={value.parking}
          onClick={() => toggleAmenity("parking")}
        />
        <AmenityToggle
          label="Pets Allowed"
          icon={<PawPrint className="w-5 h-5" />}
          selected={value.pets}
          onClick={() => toggleAmenity("pets")}
        />
      </div>
    </div>
  );
}

function AmenityToggle({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center p-2 rounded-lg border text-sm transition ${
        selected
          ? "bg-purple-100 border-purple-500 text-purple-800"
          : "border-gray-300 text-gray-600 hover:bg-gray-100"
      }`}>
      {icon}
      <span>{label}</span>
    </button>
  );
}
